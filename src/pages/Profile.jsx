import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../slices/userSlice"; 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user); 
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [editMode, setEditMode] = useState(false); 

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    useEffect(() => {
        if (user && user.id) {
            setFormData({
                name: user.name,
                email: user.email,
                password: "",
            });
        }
    }, [user]);

    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Modifica i dati utente
    const handleUpdate = async () => {
        try {
            if (!user.id) {
                setMessage("Effettua prima il login per aggiornare i dati");
                return;
            }
            const response = await axios.put(
                `http://localhost:5000/api/user/${user.id}`,
                formData
            );
            setMessage(response.data.message);
            dispatch(updateUser(response.data.user)); 
            setEditMode(false); 
        } catch (error) {
            setMessage(
                error.response?.data.message || "Errore durante l'aggiornamento"
            );
        }
    };

    // Cancellazione utente
    const handleDelete = async () => {
        try {
            if (!user.id) {
                setMessage("Effettua prima il login per cancellare il profilo");
                return;
            }
            const response = await axios.delete(
                `http://localhost:5000/api/user/${user.id}`
            );
            setMessage(response.data.message);
            dispatch(deleteUser()); 
            navigate("/"); 
        } catch (error) {
            setMessage(
                error.response?.data.message || "Errore durante la cancellazione"
            );
        }
    };

    return (
        <>
            <div className="profile-page">
                <div className="profile-img">
                    <div className="card">
                        <img
                            src="./src/assets/user-profile-img.svg"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body">
                            <p>Nome Utente</p>
                        </div>
                    </div>
                    <button onClick={() => setEditMode(true)}>Modifica dati</button>
                    <button onClick={handleDelete}>Elimina Account</button>
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
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>

                    {editMode && (
                        <>
                            <button onClick={handleUpdate}>Salva</button>
                            <button onClick={() => setEditMode(false)}>Annulla</button>
                        </>
                    )}
                </div>
                <footer>
                    <Link to="/game" className="navbar-link">
                        Game
                    </Link>
                </footer>
            </div>
        </>
    );
}

export default Profile;
