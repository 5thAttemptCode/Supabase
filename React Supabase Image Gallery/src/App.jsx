import React from 'react'
import Gallery from './pages/gallery'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ImagePage from './pages/imagePage'


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Gallery />} />
        <Route path='/:id' element={<ImagePage />} />
      </Routes>
    </BrowserRouter>
  )
}
