import React from 'react'
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeneralSettings from './components/GeneralSettings';
import Candidate from './components/Candidate';
import VoterVerfication from './components/VoterVerfication';
import Home from './components/Home';

const LayoutRoutes = () => {
  return (
    <div className='flex flex-row h-[100vh] overflow-hidden'>
        <Sidebar />
        <div className='flex-1'>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/general" element={<GeneralSettings />}/>
                <Route path="/candidates" element={<Candidate />}/>
                <Route path="/verification" element={<VoterVerfication />}/>
            </Routes>
            {/* <Footer /> */}
        </div>
    </div>
  )
}

export default LayoutRoutes