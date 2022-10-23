import {createSlice} from '@reduxjs/toolkit'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let idx = state.findIndex(v=> v.id == action.payload)
            state[idx].count++
        },
        addItem(state, action){
            let idx = state.findIndex(v=> v.id == action.payload.id)
            if (idx<0){
                state.push({
                    id:action.payload.id,
                    name : action.payload.title,
                    count: 1
                })
            }else{
                state[idx].count++
            }

        },
        deleteItem(state, action){
            let idx = state.findIndex(v=> v.id == action.payload)
            state.splice(idx,1)
        }
    }
})

export let {addCount, addItem, deleteItem} = cart.actions
export default cart;
