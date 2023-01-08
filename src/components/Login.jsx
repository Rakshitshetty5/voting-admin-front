import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/CustomAxios";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/auth/reducer";
import { useSelector } from "react-redux";

export default function Login() {
    const [state, setState] = useState({
        username: '',
        password: '',
        error : null
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setState(d => {
            return {
                ...d,
                [e.target.name]: e.target.value
            }
        })
    }

    const currentUser = useSelector(state => state.auth.currentUser)
    
    useEffect(() => {
        if(currentUser){
            navigate('/')
        }
    }, [currentUser, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!state.username.length < 3 && state.password.length < 5){
            setState(v => ({...v, error: 'Invalid Credentials'}))
            return;
        }
        try{
            const response = await customAxios.post('/login', { user_name : state.username, password: state.password})
            dispatch(signIn(response.data.data?.token))
            navigate('/')
        }catch(err){
            setState(v => ({...v, error: 'Invalid Credentials'}))
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   Admin Login
                </h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full text-center h-[0.8rem]'>
                        {!!state.error && <span className='text-[red] text-[0.9rem] text-center'>{state.error}</span>}
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}