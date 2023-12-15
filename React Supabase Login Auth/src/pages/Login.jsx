import React, { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom'
import { ThemeSupa } from '@supabase/auth-ui-shared'
  

const supabaseURL = import.meta.env.VITE_PUBLIC_URL
const supabaseKey = import.meta.env.VITE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseURL, supabaseKey)


export default function Login() {

    const navigate = useNavigate()

    useEffect(() => {
      const { authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          navigate('/success')
        } else {
          navigate('/')
        }
      })
      // Cleanup function: remove the listener when this component unmounts
      return () => {
        authListener?.unsubscribe()
      }
    }, [navigate])
  
    return (
      <div>
        <header>
          <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme= "dark"
          />
        </header>
      </div>
    )
}
