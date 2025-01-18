import React, { useState } from "react";
import "./UserProfile.css";
import { FaUserGraduate } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";


const UserProfile = () => {

    let { username, email, profilePicture } = JSON.parse(localStorage.getItem('user')) || 'empty';

    const [newUsername, setNewUsername] = useState(username || '');
    const server_url = import.meta.env.VITE_SERVER_URL;
    let token = localStorage.getItem('token');


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (newUsername.trim() === "") {
            toast.warn("Name cannot be empty.");
            return;
        }
        else if (newUsername.trim().length < 3 || newUsername.trim().length > 12) {
            toast.warn('Name must be between 3 and 12 characters long.');
            return;
        }

        if (newUsername == username) {
            toast.warn('No changes detected in your name.');
            return;
        }
        try {
            const res = await fetch(`${server_url}/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ newUsername }),
            })

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message)

                let user = {
                    username, email, profilePicture
                }

                localStorage.setItem('user', JSON.stringify({ ...user, username: newUsername }));
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div>

            <div className="profile-picture-container">
                {
                    profilePicture ? (<img
                        src={profilePicture}
                        alt="profile"
                        className="profile-picture"
                    />) : <FaUserGraduate className="profile-picture" />
                }

            </div>
            <form className='user-form' onSubmit={handleUpdate}>
                <label htmlFor="username">
                    Name
                    <input
                        type="text"
                        id='username'
                        defaultValue={username}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="username">
                    Email
                    <input type="text" id='username' defaultValue={email} disabled />
                </label>
                <button type='submit'>Update</button>
            </form>
            <ToastContainer />
        </div>
    );
};
export default UserProfile;