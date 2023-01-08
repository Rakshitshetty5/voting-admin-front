import React from 'react'
import PageContainer from './PageContainer'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Image',
        selector: row => row.image,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Voter Id',
        selector: row => row.voter_id,
    },
    {
        name: 'PVN',
        selector: row => row.pvn,
    },
    {
        name: 'Actions',
        selector: row => row.actions,
    },
];

const data = [
    {
        voter_id: '12G5f',
        name: 'Hinata Hyuga',
        pvn: '1asdsad7988',
    },
]

const VoterVerfication = () => {
  const Data = data.map((item) => {
    item.actions = <div className='space-x-4'>
        <button className='bg-[green] px-5 py-2 text-white'>Accept</button>
        <button className='bg-[red] px-5 py-2 text-white'>Reject</button>
    </div>
    item.image = <img src="https://randomuser.me/api/portraits/women/17.jpg" className='h-[8rem] p-5' alt="user" />
    return item
  })
  return (
    <PageContainer>
        <h1 className='text-3xl font-black'>Manage Voter Requests</h1>
        <div className='w-full flex justify-center mt-10'>
            <div className='w-[80%]'>
                <DataTable
                    columns={columns}
                    data={Data}
                    pagination
                    striped	
                    persistTableHead
                />
            </div>
        </div>
    </PageContainer>
  )
}

export default VoterVerfication