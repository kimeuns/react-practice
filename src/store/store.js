// state 저장소

import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './userSlice'
import cart from './cartSlice'


let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
}) 
