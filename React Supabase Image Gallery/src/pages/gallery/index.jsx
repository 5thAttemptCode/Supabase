import React, { useEffect, useState } from 'react'
import './style.css'
import Headline from '../../components/headline'
import ImagePage from '../imagePage'
import { createClient } from '@supabase/supabase-js'
import { Link } from 'react-router-dom'


const supabaseURL = import.meta.env.VITE_PUBLIC_URL
const supabaseKey = import.meta.env.VITE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseURL, supabaseKey)

export default function Gallery() {
    const [ images, setImages ] = useState([])
    const [ fetchError, setFetchError ] = useState(null)
  
    useEffect(() => {
      const fetchImages = async () => {
        const { data, error } = await supabase
          .from("Images")
          .select()
  
          if(error) {
            setFetchError("Error fetching images")
            setImages([])
            console.log("fuck")
          }
          if(data){
            setImages(data)
            setFetchError(null)
            console.log(data)
          }
      }
      fetchImages()
    }, [])
    
  return (
    <div className='gallery-container'>
      {fetchError && (<p>{fetchError}</p>)}
        {images && (
          <div className='gallery'>
            {images.map(image => (
              <Link 
                key={image.id} 
                className='image-component' 
                to={`/${image.id}`}
                element={<ImagePage />}
                state={{image}}
              >
              <img src={image.imageSrc} alt={image.name} />
              <p>{image.name}</p>
            </Link>
            ))}
          </div>
        )}
        <Headline />
    </div>
  )
}

