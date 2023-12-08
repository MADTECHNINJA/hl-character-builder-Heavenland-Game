
import { useEffect, useRef, useCallback } from 'react'
import { subdomain } from '../../utilities/constant'
import { parse } from '../../utilities/helpers'
import { useDispatch } from 'react-redux'
import { updateAavatarUrl } from '../../store/avatarSlice'
import { useNavigate } from 'react-router-dom'

const CharacterPicker = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const iFrameRef = useRef()

  const subscribe = useCallback((event) => {
    const json = parse(event)
    if (json?.source === 'readyplayerme') {
      if (json.eventName === 'v1.frame.ready') {
        iFrameRef.current.contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**'
          }),
          '*'
        )
      }

      if (json.eventName === 'v1.avatar.exported') {
        const avatarUrl = json.data.url
        dispatch(updateAavatarUrl({ avatarUrl }))
        navigate('/login')
      }
    }
  }, [iFrameRef, dispatch, navigate])

  useEffect(() => {
    window.addEventListener('message', subscribe)
    return () => window.removeEventListener('message', subscribe)
  }, [subscribe])

  return (
    <iframe
      title='iframe'
      id='frame'
      ref={iFrameRef}
      className='embed-responsive-item w-100 h-100'
      src={`https://${subdomain}.readyplayer.me/avatar?frameApi`}
      allow='camera *; microphone *' allowFullScreen
    />
  )
}
export default CharacterPicker
