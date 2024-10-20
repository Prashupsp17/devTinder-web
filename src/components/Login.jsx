import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {

const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
          const res = await  axios.post(BASE_URL + "/login", {
                emailId,
                password
            },
    
                { withCredentials: true }
            )
            console.log(res.data);
            dispatch(addUser(res.data));
            navigate("/");
        }catch(err){
            console.error(err);
        }
      
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
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
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
