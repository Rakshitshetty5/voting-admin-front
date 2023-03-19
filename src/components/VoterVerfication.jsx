import React, { useEffect, useState } from 'react'
import PageContainer from './PageContainer'
import DataTable from 'react-data-table-component';
import ElectionAbi from '../utils/SmartContract/ElectionContract.json'
import { ElectionContractAddress } from '../utils/config'
import customAxios from '../utils/CustomAxios'
const ethers = require("ethers")

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
    name: 'Actions',
    selector: row => row.actions,
  },
];

const VoterVerfication = () => {
  const [state, setState] = useState([])

  const verifyUser = async (voter_id, verification_id, wallet_address) => {
    const { ethereum } = window

    if (ethereum) {
      await ethereum.request({ method: 'eth_chainId' })
      await ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const ElectionContract = new ethers.Contract(
        ElectionContractAddress,
        ElectionAbi.abi,
        signer
      )

      ElectionContract.verfiyUser(voter_id).then(async response => {
        console.log('Completed')
        await customAxios.put('/verifyUser', { voter_id, verification_id, wallet_address })
        window.location.reload()
      }).catch(err => {
        console.log('Error', err)
      })
    }
  }

    const rejectUser = async (voter_id, verification_id) => {
      await customAxios.put('/deleteVerificationRequest', { voter_id, verification_id })
      window.location.reload()
    }

    const Data = state.map((item) => {
      item.actions = <div className='space-x-4'>
        <button className='bg-[green] px-5 py-2 text-white' onClick={() => verifyUser(item.voter_id, item._id, item.wallet_address)}>Accept</button>
        <button className='bg-[red] px-5 py-2 text-white' onClick={() => rejectUser(item.voter_id, item._id)}>Reject</button>
      </div>
      item.name = item.voter_details.first_name
      item.image = <img src={item.voter_details.image} className='h-[8rem] p-5' alt="user" />
      return item
    })

    useEffect(() => {
      (async () => {
        const response = await customAxios.get('/getPendingVerifications')
        setState(response.data.data.pendingRequests)
      })()
    }, [])

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