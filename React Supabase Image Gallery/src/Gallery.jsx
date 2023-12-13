
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ReactLenis } from "@studio-freight/react-lenis";

const supabaseURL = import.meta.env.VITE_PUBLIC_URL
const supabaseKey = import.meta.env.VITE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseURL, supabaseKey)


export default function Gallery() {
    const [ images, setImages ] = useState([])
    const [ fetchError, setFetchError ] = useState(null)
  
    useEffect(() => {
      const fetchImages = async () => {
        const { data, error } = await supabase
          .from("images")
          .select()
  
          if(error) {
            setFetchError("Error fetching images")
            setImages([])
            console.log(error);
          }
          if(data){
            setImages(data)
            setFetchError(null)
          }
      }
  
      fetchImages()
    }, [])
    
  return (
    <div>
      {fetchError && (<p>{fetchError}</p>)}
      <ReactLenis
        root
        options={{ 
            orientation: "horizontal", 
            gestureOrientataion: "both",
            infinite: true
        }}
      >
        {images && (
          <div className='gallery'>
            {images.map(image => (
              <div key={image.id} className='image-component'>
                <img src={image.imageSrc} alt="" />
                <p>{image.name}</p>
              </div>
            ))}
          </div>
        )}
      </ReactLenis>
    </div>
  )
}
