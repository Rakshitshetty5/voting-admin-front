import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { signOut, setCurrentPhase } from "../redux/auth/reducer";
import { useDispatch } from "react-redux";
import customAxios from '../utils/CustomAxios';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      //call only if access token available
      const response = await customAxios.get("/getGeneralSettings");
      console.log(response)
      dispatch(
        setCurrentPhase(response.data.data.phase)
      );
    })();
  }, [])

  const logout = () => {
    dispatch(signOut());
    navigate("/login");
  };
    return (
    <div className='h-[5rem] border-b w-full px-10 flex items-center'>
        <button className='ml-auto' onClick={logout}>Logout</button>
    </div>
  )
}

export default Header