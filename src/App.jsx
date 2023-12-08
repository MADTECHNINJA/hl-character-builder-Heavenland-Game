import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Main from './components/main/Main'
import useReload from './hooks/reload'
import { updateToken } from './store/userSlice'
import { AUTH_URI } from './utilities/constant'

const App = () => {
  const dispatch = useDispatch()

  useReload()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios({
        url: AUTH_URI,
        method: 'post',
        withCredentials: true
      })
      dispatch(updateToken(data?.accessToken?.value || null))
    }

    fetch()
  }, [dispatch])

  return (
    <div className='d-flex flex-column vh-100'>
      <Main />
    </div>
  )
}

export default App
