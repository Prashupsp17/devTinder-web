import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({user}) => {
    const dispatch = useDispatch();
const {_id,firstName,lastName,age,photoUrl,gender,about} = user;

const handleSendRequest = async(status,userId) => {
    try{

        const res = await axios.post(
            BASE_URL + "/request/send/" + status + "/" + userId,
            {},
            {withCredentials:true}
        )
        dispatch(removeUserFromFeed(userId));

    }catch(err){

    }

}
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img
                        src={user.photoUrl}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age +" " + gender}</p> }
                    {about && <p>{about}</p>}
                    <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
