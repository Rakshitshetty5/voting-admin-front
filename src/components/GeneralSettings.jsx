import React, { useState } from 'react'
import PageContainer from './PageContainer'
import { useSelector } from 'react-redux'
import customAxios from '../utils/CustomAxios'
import { useDispatch } from 'react-redux'
import { setCurrentPhase } from '../redux/auth/reducer'

const GeneralSettings = () => {
  const currentPhase = useSelector(state =>  state.auth.currentPhase)
  const [selectedPhase, setSelectedPhase] = useState(currentPhase)
  const dispatch = useDispatch()

  const updateCurrentPhase = async () => {
    if(currentPhase === selectedPhase){
        return
    }
    const response = await customAxios.put('/changeVotingPhase', { phase: selectedPhase })
    if(response.data.status === 'success'){
        dispatch(setCurrentPhase(response.data.data?.data.phase))
        alert('Updated Successfully')
    }else{
        alert('Kuch tho problem hai babu bhaiya')
    }
  }

  return (
    <PageContainer>
        <h1 className='text-3xl font-black'>General Settings</h1>
        <div className='w-full flex justify-center mt-10'>
            <div className='w-[80%]'>
                <div className='flex flex-col space-y-5 items-center'>
                    <label className="text-lg w-full">Current Phase</label>
                    <select onChange={(e) => setSelectedPhase(e.target.value)} value={selectedPhase}  className='h-[2.5rem] px-5 w-full outline-none border-none'>
                        <option value={"0"}>Registration</option>
                        <option value={"1"}>Verification</option>
                        <option value={"2"}>Voting</option>
                        <option value={"3"}>Result</option>
                    </select>
                    <button onClick={updateCurrentPhase} className='bg-blue-500 text-white h-[2.5rem] w-[12rem]'>Save</button>
                </div>
            </div>
        </div>
    </PageContainer>
  )
}

export default GeneralSettings