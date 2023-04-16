import React, { useState } from 'react'
import FileBase64 from 'react-file-base64';
import customAxios from '../utils/CustomAxios';

const AddCandidate = ({ toggleShowForm }) => {
    const [state, setState] = useState({
        party: {
            value : '',
            error : null
        },
        candidate_image: {
            value : '',
            error : null
        },
        party_image: {
            value : '',
            error : null
        },
        first_name: {
            value : '',
            error : null
        },
        last_name: {
            value : '',
            error : null
        },
        middle_name: {
            value : '',
            error : null
        },
        email:{
            value : '',
            error : null
        },
        phone: {
            value : '',
            error : null
        },
        dob: {
            value : '',
            error : null
        },
    })

    const [isFetching, setIsFetching] = useState(false)

    const addCandidate = async () => {
        if(isFetching) return
        setIsFetching(true)
        const reqObject = {}
        let error = false
        const newState = {...state}
        console.log(newState)
        for(let obj in newState){
            if(!newState[obj].value){
                error = true
                newState[obj].error = true
            }else{
                newState[obj].error = false
            }
            reqObject[obj] = state[obj].value
        }
        if(error){
            setState(newState)
            return
        }
        try{
            const response = await customAxios.post('/addCandidate', reqObject)
            if(response.data.status === 'success'){
                alert('Added Successfully')
            }else{
                alert('Something went wrong')
            }
        }catch(err){
            alert(err.response.data.data.message)
        }
        toggleShowForm()
        setIsFetching(false)
    }

    const handleChange = (e) => {
        let { value, name  } = e.target

        setState(v => (
            {
                ...v,
                [name]: {
                    ...v[name],
                    value
                }
            }
        ))
    }

    const handleFileChange = (file, name) => {
        setState(v => ({
            ...v,
            [name]: {
                ...v[name],
                value: file.base64
            }
        })
        )
    }

    return (
        <div className='grid grid-cols-2 gap-x-8 gap-4'>
            <div className='flex flex-col space-y-2 w-full'>
                <label>First Name</label>
                <input onChange={handleChange} value={state.first_name.value} type="text" name="first_name" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.first_name.error && 'First name is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Last Name</label>
                <input onChange={handleChange} value={state.last_name.value} type="text" name="last_name" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.last_name.error && 'Last name is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Middle Name</label>
                <input onChange={handleChange} value={state.middle_name.value} type="text" name="middle_name" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.middle_name.error && 'Middle name is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Email</label>
                <input onChange={handleChange} type="email" value={state.email.value} name="email" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.email.error && 'Email is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Phone</label>
                <input onChange={handleChange} type="email" value={state.phone.value} name="phone" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.phone.error && 'Phone is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Party</label>
                <input  onChange={handleChange}type="text" value={state.party.value} name="party" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.party.error && 'Party is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Date of Birth</label>
                <input onChange={handleChange} type="date" value={state.dob.value} name="dob" className='border-2 h-[2.3rem]' />
                <label className='h-[1.5rem] text-red-500'>{state.dob.error && 'DOB is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Candidate Image</label>
                <FileBase64
                    onDone={ (file) => handleFileChange(file, 'candidate_image') } 
                />
                <label className='h-[1.5rem] text-red-500'>{state.candidate_image.error && 'Candidate image is required'}</label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Party Image</label>
                <FileBase64
                    onDone={ (file) => handleFileChange(file, 'party_image') } 
                />                
                <label className='h-[1.5rem] text-red-500'>{state.party_image.error && 'Party image is required'}</label>
            </div>
            <button disabled={isFetching} onClick={addCandidate} className='w-[12rem] bg-green-500 rounded-md py-2 text-white mt-10 col-start-1 -mr-[50%] justify-self-center'>Add Candidate</button>
        </div>
    )
}

export default AddCandidate