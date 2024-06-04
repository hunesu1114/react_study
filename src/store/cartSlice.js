import {createSlice} from "@reduxjs/toolkit";

let cart=createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        increaseCount(state, id) {
            state.map((e)=>{
                if (e.id === id.payload) {
                    e.count += 1;
                }
            })
        },
        addItem(state, param) {
            let item = param.payload;
            return [...state, item];
        },
    }
})
export let {increaseCount, addItem} = cart.actions;

export default cart;