import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';

const Request = () => {
    const [request, setRequest] = useState([]);
    console.log(request);


    

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true
            });
            setRequest(res.data.data);

        } catch (err) {

        }

    }

    const reviewRequest = async (status,_id) => {
         try{
            const res = await axios.post(BASE_URL + "/request/review/"+ status +"/" + _id,
                {},
                {withCredentials:true}
            )
            const updatedData = request.filter((r,i) => r._id !== _id);
            console.log(updatedData);
            setRequest(updatedData);
         }catch(err){
            console.log(err);
         }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!request) return;

    if (request.length === 0) return <div className="flex justify-center items-center my-10">No Request Found</div>

    return (
        <div className=" text-center my-5">
            <h1 className='text-bold text-2xl'>Requests</h1>
            {
                request.map((request) => {
                    const { _id, firstName, lastName, about, gender, photoUrl, age } = request.fromUserId;
                    return (
                        <div 
                        key={_id} 
                        className="flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto">
                            <div> <img src={photoUrl} className='w-20 h-20 rounded-full' alt="photo" /></div>
                            <div className="text-left m-4">
                                <h1 className="fomt-bold text-xl">{firstName + " " + lastName}</h1>
                                {age && gender && <p>{age + "," + gender}</p>}
                                <p>{about}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="btn btn-primary mx-2" 
                                onClick={() => reviewRequest("rejected", request._id)}
                                >Reject</button>
                                <button className="btn btn-secondary mx-2" 
                                onClick={() => reviewRequest("accepted", request._id)}
                                >Accept</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Request
