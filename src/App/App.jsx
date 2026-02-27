import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MapPage from '../pages/MapPage'
import FavoritesPage from '../pages/FavoritesPage'
import AboutPage from '../pages/AboutPage'
import Layout from '../components/Layout'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Navigate to="/map" replace />}/>
        <Route path='/map' element={<MapPage/>}/>
        <Route path='/favorites' element={<FavoritesPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
      </Route>
      <Route path='*' element={<Navigate to="/map" replace/>}/>
    </Routes>
  )
}

export default App
