import React, { useState, useEffect } from 'react'
import PageContainer from './PageContainer'
import DataTable from 'react-data-table-component';
import AddCandidate from './AddCandidate';
import customAxios from '../utils/CustomAxios';
import { ReactComponent as Loader } from '../assets/Loader.svg'

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
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleDelete = async(id) => {
    setIsFetching(true)
    await customAxios.put('/deleteCandidate', { candidate_id:  id})
    getData()
  }

  const Data = candidates.map((item) => {
    item.name = item.first_name + ' ' + item.last_name
    item.actions = <button className='bg-[red] px-5 py-2 text-white' onClick={() => handleDelete(item._id)}>Delete</button>
    item.candidate_img = <img src={item.candidate_image} className='h-[8rem] p-5' alt="user" />
    return item
  })

  const getData = async () => {
        setIsFetching(true)
        const response = await customAxios.get('/getAllCandidates', { pageNo: 1, limit: 10 })
        setCandidates(response.data.data?.candidates)
        setIsFetching(false)
  }

  useEffect(() => {
      (async() => {
        getData()
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
                            paginationServer
                            progressComponent={<Loader />}
                            progressPending={isFetching}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                }
            </div>
        </div>
    </PageContainer>
  )
}

export default Candidate