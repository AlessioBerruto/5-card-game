import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../slices/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ShowIcon from "/assets/fronte-carta.svg";
import CoverIcon from "/assets/retro-carta.svg";
import { setLoading } from "../slices/loadingSlice";

function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.userData);
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		password: user?.password || "",
	});
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [file, setFile] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				password: user.password,
			});
			setImagePreview(user.profileImage);
		}
	}, [user]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleUpdate = async () => {
		try {
			if (!user.email) {
				setMessage("Effettua prima il login per aggiornare i dati");
				return;
			}

			if (formData.password && formData.password.length < 6) {
				setMessage("La password deve avere almeno 6 caratteri");
				return;
			}

			console.log("Dati inviati per l'aggiornamento:", {
				email: formData.email,
				...formData,
			});

			dispatch(setLoading(true));
			const response = await axios.put(
				`https://five-card-game.onrender.com/api/user`,
				{
					currentEmail: user.email,
					email: formData.email,
					name: formData.name,
					password: formData.password,
				}
			);

			setMessage(response.data.message);
			dispatch(updateUser(response.data.user));

			if (formData.email !== user.email) {
				await axios.put(
					`https://five-card-game.onrender.com/api/update-profile-image`,
					{
						oldEmail: user.email,
						newEmail: formData.email,
					}
				);
			}

			setEditMode(false);
		} catch (error) {
			setMessage(
				error.response?.data.message || "Errore durante l'aggiornamento"
			);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleDelete = async () => {
		try {
			if (!user.email) {
				setMessage("Effettua prima il login per cancellare il profilo");
				return;
			}

			dispatch(setLoading(true));
			const response = await axios.delete(
				`https://five-card-game.onrender.com/api/user`,
				{ data: { email: user.email } }
			);
			setMessage(response.data.message);
			dispatch(deleteUser());
			navigate("/");
		} catch (error) {
			setMessage(
				error.response?.data.message || "Errore durante la cancellazione"
			);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleImageChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		}
	};

	const handleImageUpload = async () => {
		if (!file || !["image/jpeg", "image/png"].includes(file.type)) {
			setMessage("Seleziona un'immagine JPEG o PNG.");
			return;
		}

		const allowedTypes = ["image/jpeg", "image/png"];
		if (!allowedTypes.includes(file.type)) {
			setMessage("Carica un'immagine JPEG o PNG.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("image", file);
			formData.append("email", user.email);

			dispatch(setLoading(true));

			const response = await axios.post(
				`https://five-card-game.onrender.com/api/upload-profile-image`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const imageUrl = response.data.imageUrl;
			setImagePreview(imageUrl);

			setMessage("Immagine caricata con successo!");
			dispatch(updateUser({ ...user, profileImage: imageUrl }));
		} catch (error) {
			console.error(
				"Errore durante il caricamento dell'immagine:",
				error.response || error.message
			);
			if (error.response) {
				setMessage(
					`Errore durante il caricamento dell'immagine: ${
						error.response.data.message || error.message
					}`
				);
			} else {
				setMessage("Errore di rete o problema con il server.");
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<div className="profile-page">
			<div className="page-content">
				<div className="profile-img">
					<div className="card-bg-trasparent">
						<img
							src={
								imagePreview ||
								`${import.meta.env.BASE_URL}/assets/utente-nero.svg`
							}
							className="card-img-top"
							alt="icona del profilo"
						/>
						<div className="card-body">
							<p>{user?.name || "Nome Utente"}</p>
						</div>
					</div>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="upload-img-btn"
					/>
					<button onClick={handleImageUpload} className="upload-btn">
						Carica immagine
					</button>
					<button onClick={() => setEditMode(true)} className="edit-btn">
						Modifica dati
					</button>
					<button
						onClick={() => setShowDeleteModal(true)}
						className="delete-btn"
					>
						Elimina Account
					</button>
				</div>
				<div className="profile-details">
					<h2>Dati dell'utente</h2>
					<p className="message-field">{message}</p>

					<input
						type="text"
						name="name"
						placeholder="Nome"
						value={formData.name}
						onChange={handleChange}
						disabled={!editMode}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						disabled={!editMode}
					/>
					<div className="password-field">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							disabled={!editMode}
						/>
						<span
							className="password-toggle-icon"
							onClick={togglePasswordVisibility}
						>
							<img
								src={showPassword ? ShowIcon : CoverIcon}
								alt="toggle password visibility"
							/>
						</span>
					</div>

					{editMode && (
						<div className="edit-mode-container">
							<button onClick={handleUpdate} className="save-btn">
								Salva
							</button>
							<button onClick={() => setEditMode(false)} className="cancel-btn">
								Annulla
							</button>
						</div>
					)}
				</div>

				{showDeleteModal && (
					<div className="logout-modal-overlay">
						<div className="logout-modal">
							<h2>Sei sicuro di voler eliminare il tuo account?</h2>
							<div className="logout-modal-buttons">
								<button
									className="btn-confirm"
									onClick={() => {
										handleDelete();
										setShowDeleteModal(false);
									}}
								>
									Sì
								</button>
								<button
									className="btn-cancel"
									onClick={() => setShowDeleteModal(false)}
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			<footer>
				<Link to="/game" className="footer-link">
					↱ Torna al gioco ↰
				</Link>
			</footer>
		</div>
	);
}

export default Profile;
