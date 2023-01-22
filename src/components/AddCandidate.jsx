import React, { useState } from 'react'
import FileBase64 from 'react-file-base64';
import customAxios from '../utils/CustomAxios';

const AddCandidate = ({ toggleShowForm }) => {
    const [state, setState] = useState({
        party: {
            value : '',
            error : null
        },
        voter_id: {
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

    const addCandidate = async () => {
        const reqObject = {}
        for(let obj in state){
            reqObject[obj] = state[obj].value
        }
        const response = await customAxios.post('/addCandidate', reqObject)
        if(response.data.status === 'success'){
            alert('Added Successfully')
        }else{
            alert('Something went wrong')
        }
        toggleShowForm()
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
                <input onChange={handleChange} type="text" name="first_name" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Last Name</label>
                <input onChange={handleChange} type="text" name="last_name" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Middle Name</label>
                <input onChange={handleChange} type="text" name="middle_name" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Email</label>
                <input onChange={handleChange} type="email" name="email" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Phone</label>
                <input onChange={handleChange} type="email" name="phone" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Party</label>
                <input  onChange={handleChange}type="text" name="party" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Date of Birth</label>
                <input onChange={handleChange} type="date" name="dob" className='border-2 h-[2.3rem]' />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Candidate Image</label>
                <FileBase64
                    onDone={ (file) => handleFileChange(file, 'candidate_image') } 
                />
                <label></label>
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <label>Party Image</label>
                <FileBase64
                    onDone={ (file) => handleFileChange(file, 'party_image') } 
                />                
                <label></label>
            </div>
            <button onClick={addCandidate} className='w-[12rem] bg-green-500 rounded-md py-2 text-white mt-10 col-start-1 -mr-[50%] justify-self-center'>Add Candidate</button>
        </div>
    )
}

export default AddCandidate