import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  avatarUrl: ''
}

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    updateAavatarUrl (state, { payload }) {
      state.avatarUrl = payload.avatarUrl
    }
  }
})

export const { updateAavatarUrl } = avatarSlice.actions

export const avatarUrlSelector = state => state.avatar.avatarUrl

export default avatarSlice.reducer
