import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom'
import { ThemeSupa } from '@supabase/auth-ui-shared'
  

const supabaseURL = import.meta.env.VITE_PUBLIC_URL
const supabaseKey = import.meta.env.VITE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseURL, supabaseKey)


export default function Success() {

  const [ user, setUser ] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    async function getUserData() {
        await supabase.auth.getUser().then((value) => {
            if (value.data?.user){
                setUser(value.data.user)
            }
        })
    }
    getUserData()
  }, [])


  //Logout
  async function signOutUser() {
    const { error } = await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <div>
        { Object.keys(user).length !== 0 ? 
            <>
                <h1>You are logged in!</h1>
                <button onClick={() => signOutUser()}>SIGN OUT</button>
            </>
        :
            <>
                <h1>User is not logged in</h1>
                <button onClick={() => { navigate("/")}}>Go home</button>
            </>
        }
    </div>
  )
}
