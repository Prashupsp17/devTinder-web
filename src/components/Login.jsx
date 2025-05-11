import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            },

                { withCredentials: true }
            )

            dispatch(addUser(res.data));
            navigate("/");
        } catch (err) {
            setError(err?.response?.data);
            console.error(err?.response?.data || "Something went wrong");
        }

    }

    const handleSignUp = async () => {
        try {

            const res = await  axios.post(BASE_URL + '/signup', {
                firstName,
                lastName,
                emailId,
                password

            },
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data));
            navigate("/profile");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>

                    {
                        !isLoginForm && (
                            <>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">FirstName</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">LastName</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>
                        )
                    }
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={emailId}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                    </label>
                    {error && <p className="text-red-800">{error}</p>}
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm(!isLoginForm)}>{
                        isLoginForm
                            ?
                            "New User Sign up here"
                            :
                            "Existing User Login Here"

                    }</p>
                </div>
            </div>
        </div>
    )
}

export default Login
