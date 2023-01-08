import { useEffect } from 'react'
import Login from './components/Login'
import { Route, Routes } from "react-router-dom";
import LayoutRoutes from "./LayoutRoutes";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router'

function App() {
  const currentUser = useSelector(state => state.auth.currentUser)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!currentUser){
      navigate('/login')
    }
  }, [currentUser, navigate])

  return (
    <Routes>
      <Route path={'/login'} element={<Login />}/>
      <Route path={'/*'} element={<LayoutRoutes />}/>
    </Routes>
  );
}

export default App;
