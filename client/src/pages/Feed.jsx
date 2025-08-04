import React, { useState ,useEffect } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../Components/Loading'
import StoriesBar from '../Components/StoriesBar'
import PostCard from '../Components/PostCard'

const Feed = () => {

  const [feeds, setFeeds] = useState([])
  
  const [loading, setLoading] = useState(true)

  const fetchFeeds = async() => {
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(()=>{
    fetchFeeds()
  },[])
  return !loading ?(
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/*Stories and post List*/}
      <div>
        <StoriesBar/>
 
      <div className='p-4 space-y-6'>
     {feeds.map((post)=>(
      <PostCard key={post._id} post={post}/>
     ))}
      </div>
      
      </div>
      {/*Right Sidebar*/}
      <div>
        <div>

        
      <h1>Sponsored</h1>
      </div>
      <h1> Recent message</h1>
  
    </div>
    </div>
  ):<Loading/>
}

export default Feed
