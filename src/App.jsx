import './App.css'
import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import MainContent from './Components/MainContent/MainContent'

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <MainContent/>
    </div>
  )
}

export default App
