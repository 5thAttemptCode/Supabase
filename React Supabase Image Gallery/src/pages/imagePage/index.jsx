import React from 'react'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'


export default function ImagePage() {

  const location = useLocation()
  const image = location.state.image
  const navigate = useNavigate()

  return (
    <div className="image-page">
      <div className="box">
        <img src={image.imageSrc} alt={image.name} />
        <button onClick={() => navigate("/")}>GO BACK</button>
      </div>
      <div className='box'>
        <h2>{image.name}</h2>
        <p>{image.description}</p>
      </div>
    </div>
  )
}
