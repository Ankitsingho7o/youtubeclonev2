import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'
import { Context } from '../context/contextApi'

function LimitExccded() {
    const {setLoading}= useContext(Context)
    useEffect(()=>{
    setLoading(false)
    },[])
  return (
    <div className='h-full w-full absolute top-0 z-50 bg-gray-900 flex flex-col gap-6 items-center justify-center'>
      <h1 className='text-5xl text-white'>Sorry 😐, But my api call limit exceeded</h1>
      <div className='flex flex-col items-center justify-center gap-5  text-4xl text-white'>
                 
              <h1>It will be renewed in the next 24 hours, </h1>

              <div className='flex gap-2'>
                    <h3>Till then you can connect with me <SocialIcon url="https://www.linkedin.com/in/ankitsingho3o/" /></h3>
              </div>
      </div>
    </div>
  )
}

export default LimitExccded
