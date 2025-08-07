import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'

const CreatePost = () => {

  const [content, setContent] = useState('')
  const [images, setImages] = useState([])

  const [loading, setLoading] = useState(false)

  const user = dummyUserData;


  return (
    <div className='min-h-screen bg-gradient-to-r from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>
      {/*Title */}
      <div className='mb-8'>
      <h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Post</h1>
      <p className='text-slate-600'>Share your thoughts with the world</p>
      </div>

      {/*form */}
      <div className='max-w-xl bg-white p-4 sm:pb-3 rounded-xl shadow-md space-y-4'>
      {/**header */}
      <div>
        <img src={user.profile_picture} alt="" className='w-12 h-12
        rounded-full shadow' />
        <div>
          <h2 className='font-semibold'>{user.full_name}</h2>
          <p>@{user.username}</p>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default CreatePost
