import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { charBuilder, INVENTORY_UI_URI, REACT_APP_LOGIN_PORTAL, wsUrl } from '../../utilities/constant'
import { tokenSelector } from '../../store/userSlice'
import { RELOAD } from '../../hooks/reload'

import style from './Login.module.css'

export default function Login ({ avatarUrl }) {
  const [statusCode, setStatusCode] = useState(0)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const token = useSelector(tokenSelector)

  const saveAvatar = async () => {
    setResponseMessage('')
    setIsLoading(true)

    try {
      const response = await axios.postForm(wsUrl + charBuilder, {
        charUrl: avatarUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setStatusCode(response.status)

      if (response.status === 201) {
        setResponseMessage('Avatar Saved. It might take up to 5 minutes to appear in your inventory')
        setTimeout(() => {
          window.close()
          window.location.assign(INVENTORY_UI_URI)
        }, 5000)
      }
    } catch (error) {
      setIsLoading(false)
      setStatusCode(error.response.status)
      setResponseMessage(error.response.data?.error || 'An error occured')
    }
  }

  const params = new URLSearchParams({ redirectTo: `${window.location.href}?${RELOAD}=true` })
  const url = `${REACT_APP_LOGIN_PORTAL}&${params}`

  return (
    <>
      <div className={`${style.wrapper} d-grid gap-2 p-4 rounded`}>
        {
          responseMessage && <Alert variant={statusCode === 201 ? 'success' : 'danger'}>{responseMessage}</Alert>
        }
        {
          token
            ? (
              <button className={`${style['btn-gradient']} btn btn-lg`} type='submit' onClick={saveAvatar} disabled={isLoading}>
                Save Avatar
              </button>
              )
            : (
              <a href={url} className={`${style['btn-gradient']} btn btn-lg`}>
                Login
              </a>
              )
        }
        <Link className={`${style['btn-gradient']} btn btn-lg`} to='/'>
          Back To Editor
        </Link>
      </div>
    </>
  )
}

Login.propTypes = {
  avatarUrl: PropTypes.string
}
