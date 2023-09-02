import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/Landing'
import HomePage from './pages/HomePage'

function App() {


  return (
    <div className='w-full h-full'>
     <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/home" element={ <HomePage /> } />
     </Routes>
    </div>
  )
}

export default App
