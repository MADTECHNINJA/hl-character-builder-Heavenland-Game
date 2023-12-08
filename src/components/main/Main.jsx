import CharacterPicker from '../character-picker/CharacterPicker'
import Login from '../login/Login'
import MainCss from './Main.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { avatarUrlSelector } from '../../store/avatarSlice'
import Protected from '../../middlewares/Protected'

const Main = () => {
  const avatarUrl = useSelector(avatarUrlSelector)

  return (
    <div className={MainCss.content}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<CharacterPicker />} />
          <Route
            exact path='/login' element={
              <Protected avatarUrl={avatarUrl}>
                <Login avatarUrl={avatarUrl} />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default Main
