import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../slices/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ShowIcon from '/assets/fronte-carta.svg';
import CoverIcon from '/assets/retro-carta.svg';



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

            console.log("Dati inviati per l'aggiornamento:", { email: formData.email, ...formData });

            const response = await axios.put(
                `https://five-card-game.onrender.com/api/user`, 
                { 
                    currentEmail: user.email, 
                    email: formData.email,     
                    name: formData.name, 
                    password: formData.password 
                }
            );

            console.log("Risposta dal server:", response.data);

            setMessage(response.data.message);
            dispatch(updateUser(response.data.user));
            setEditMode(false);
        } catch (error) {
            console.error("Errore durante l'aggiornamento:", error);
            setMessage(error.response?.data.message || "Errore durante l'aggiornamento");
        }
    };

    const handleDelete = async () => {
        try {
            if (!user.email) {
                setMessage("Effettua prima il login per cancellare il profilo");
                return;
            }
            const response = await axios.delete(
                `https://five-card-game.onrender.com/api/user`, 
                { data: { email: user.email } } 
            );
            setMessage(response.data.message);
            dispatch(deleteUser());
            navigate("/");
        } catch (error) {
            setMessage(error.response?.data.message || "Errore durante la cancellazione");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-img">
                <div className="card-bg-trasparent">
                    <img
                        src={`${import.meta.env.BASE_URL}/assets/utente-nero.svg`}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <p>{user?.name || "Nome Utente"}</p>
                    </div>
                </div>
                <button onClick={() => setEditMode(true)} className="edit-btn">
                    Modifica dati
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="delete-btn">
                    Elimina Account
                </button>
            </div>
            <div className="profile-details">
                <h2>Dati dell'utente</h2>
                <p>{message}</p>

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
                        <img src={showPassword ? ShowIcon : CoverIcon} alt="toggle password visibility" />
                    </span>
                </div>

                {editMode && (
                    <div className="edit-mode-container">
                        <button onClick={handleUpdate} className="save-btn">Salva</button>
                        <button onClick={() => setEditMode(false)} className="cancel-btn">Annulla</button>
                    </div>
                )}
            </div>
            <footer>
                <Link to="/game" className="footer-link">
                    ↱ Torna al gioco ↰
                </Link>
            </footer>

            
            {showDeleteModal && (
                <div className="logout-modal-overlay">
                    <div className="logout-modal">
                        <h2>Sei sicuro di voler eliminare il tuo account?</h2>
                        <div className="logout-modal-buttons">
                            <button className="btn-confirm" onClick={() => {
                                handleDelete();
                                setShowDeleteModal(false);
                            }}>
                                Sì
                            </button>
                            <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
