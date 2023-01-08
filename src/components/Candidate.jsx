import React, { useState, useEffect } from 'react'
import PageContainer from './PageContainer'
import DataTable from 'react-data-table-component';
import AddCandidate from './AddCandidate';
import customAxios from '../utils/CustomAxios';

const columns = [
    {
        name: 'Image',
        selector: row => row.candidate_img,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Party',
        selector: row => row.party,
    },
    {
        name: 'Actions',
        selector: row => row.actions,
    },
];

const Candidate = () => {
  const [showForm, setShowForm] = useState(false)
  const [candidates, setCandidates] = useState([])

  const Data = candidates.map((item) => {
    item.name = item.first_name + ' ' + item.last_name
    item.actions = <button className='bg-[red] px-5 py-2 text-white'>Delete</button>
    item.candidate_img = <img src={item.candidate_image} className='h-[8rem] p-5' alt="user" />
    return item
  })

  useEffect(() => {
      (async() => {
        const response = await customAxios.get('/getAllCandidates', { pageNo: 1, limit: 10 })
        setCandidates(response.data.data?.candidates)
      })()
  }, [showForm])

  return (
    <PageContainer>
        <div className='w-full flex items-center justify-between'>
            <h1 className='text-3xl font-black'>Manage Candidates</h1>
            <button onClick={() => setShowForm(v => !v)} className='w-[12rem] bg-blue-500 rounded-md py-2 text-white'>{showForm ? 'View Candidates' : 'Add Candidate'}</button>
        </div>
        <div className='w-full flex justify-center mt-10'>
            <div className='w-[80%]'>
                {
                    showForm ? 
                        <AddCandidate toggleShowForm={() => setShowForm(v => !v)}/>
                        : 
                        <DataTable
                            columns={columns}
                            data={Data}
                            pagination
                            striped	
                            persistTableHead
                        />
                }
            </div>
        </div>
    </PageContainer>
  )
}

export default Candidate