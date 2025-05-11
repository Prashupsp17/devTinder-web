import React, { useState,useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Connections = () => {

    const [connections,setConnections] = useState([]);
    const fetchConnections = async() => {
        try{
            const res= await axios.get(BASE_URL +"/user/connections" ,
                {withCredentials:true});
                setConnections(res?.data?.data);
        }catch(err){


        }
    }

    useEffect(() => {
         fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length === 0) return <>No Connections Found</>

  return (
    <div className=" text-center my-5">
        <h1 className='text-bold text-2xl'>Connections</h1>
        {
            connections.map((connection) => {
                const {_id,firstName,lastName,about,gender,photoUrl,age} = connection;
                return(
                    <div
                     key={_id} className="flex m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto">
                       <div> <img src={photoUrl} className='w-20 h-20 rounded-full'  alt="photo" /></div>
                       <div className="text-left m-4">
                       <h1 className="fomt-bold text-xl">{firstName + " " + lastName}</h1>
                       {age && gender && <p>{age + "," + gender}</p>}
                       <p>{about}</p>
                       </div>
                      <Link to={"/chat/"+ _id}>
                      <button className="btn btn-primary">Chat </button>
                      </Link> 
                 
                    </div>
                )
            })
        }
    </div>
  )
}

export default Connections
