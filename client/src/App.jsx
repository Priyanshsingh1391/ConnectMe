import { useUser, useAuth } from '@clerk/clerk-react'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import Feed from './pages/Feed'
import Login from './pages/Login'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import Layout from './pages/Layout'

import { fetchUser } from './features/user/userSlice'
import { fetchConnections } from './features/connections/connectionsSlice'
import { addMessage } from './features/messages/messagesSlice'

const App = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)
  const dispatch = useDispatch()

  // Keep track of the current route
  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  // Fetch user and connections when logged in
  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      try {
        const token = await getToken()
        if (token) {
          dispatch(fetchUser(token))
          dispatch(fetchConnections(token))
        }
      } catch (err) {
        console.error('Fetch user/connections error:', err)
      }
    } 
    fetchData()
  }, [user, getToken, dispatch])

  // SSE setup for real-time messages
  useEffect(() => {
    if (!user) return
    let eventSource

    const setupSSE = async () => {
      try {
        const token = await getToken()
        if (!token) return

        eventSource = new EventSource(
          `${import.meta.env.VITE_BASEURL}/api/message/sse/${user.id}`,
          { withCredentials: true }
        )

        eventSource.onmessage = (event) => {
          const message = JSON.parse(event.data)
          if (pathnameRef.current === '/messages/' + message.from_user_id._id) {
            dispatch(addMessage(message))
          } else {
            // Optionally: show toast or notification
            toast.custom((t)=>(
              <Notification t={t} message= {message}/>
            ),{position: "bottom-right"})
          }
        }

        eventSource.onerror = (err) => {
          console.error('SSE error:', err)
          eventSource.close()
        }
      } catch (err) {
        console.error('SSE setup error:', err)
      }
    }

    setupSSE()

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [user, getToken, dispatch])

  return (
    <>
      <Toaster />
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Layout />}>
            <Route index element={<Feed />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:userId" element={<ChatBox />} />
            <Route path="connections" element={<Connections />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      )}
    </>
  )
}

export default App
