import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {

    if(feed) return;
    try {
       const res = await axios.get(BASE_URL + "/feed",{withCredentials:true})
       console.log(res.data);
      dispatch(addFeed(res?.data?.data))

    } catch (err) {

    }

  }

  useEffect(() => {
    getFeed();
  }, [])

  if(!feed) return;

  if(feed.length < 1) return <h1 className="flex justify-center my-10">No new users found!</h1>

  return (
    <div>
      {
      feed && (
        <UserCard user={feed[0]} />
      )
    }
    </div>
  )
}

export default Feed
