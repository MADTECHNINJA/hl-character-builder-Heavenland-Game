import { configureStore } from '@reduxjs/toolkit'

import avatar from './avatarSlice'
import user from './userSlice'

export const store = configureStore({
  reducer: { avatar, user }
})
