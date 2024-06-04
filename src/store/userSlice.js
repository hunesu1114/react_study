import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user',
    initialState: {name: 'kim', age: 31},
    reducers:{
        updateName(state) {
            // return {name:'park', age: 31}
            // or
            state.name = 'park';
        },
        increaseAge(state, n) {
            state.age += n.payload;
        },
    }
});

export let {updateName, increaseAge} = user.actions;

export default user;