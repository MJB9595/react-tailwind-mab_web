import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MapPage from '../pages/MapPage'
import FavoritesPage from '../pages/FavoritesPage'
import AboutPage from '../pages/AboutPage'
import Layout from '../components/Layout'
import { FavoritesProvider } from '../../contexts/FavoritesContext'
import { WifiProvider } from '../hook/WifiDataContext.jsx'

const App = () => {
  return (
    <WifiProvider>
      <FavoritesProvider>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Navigate to="/map" replace />}/>
            <Route path='/map' element={<MapPage/>}/>
            <Route path='/favorites' element={<FavoritesPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
          </Route>
          <Route path='*' element={<Navigate to="/map" replace/>}/>
        </Routes>
      </FavoritesProvider>
    </WifiProvider>
  )
}

export default App
