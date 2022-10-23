import {createSlice} from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age: 15},
    reducers : {
        changeName(state){
            state.name = 'park' //immer.js 덕분에 가능
            state.age+=1;
        },
        increase(state, action){
            state.age+=action.payload
        }
    }
})

export let {changeName, increase} = user.actions
export default user;