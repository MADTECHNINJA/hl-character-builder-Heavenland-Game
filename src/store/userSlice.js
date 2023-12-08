import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken (state, { payload }) {
      state.token = payload
    }
  }
})

export const tokenSelector = state => state.user.token

export const { updateToken } = userSlice.actions

export default userSlice.reducer
