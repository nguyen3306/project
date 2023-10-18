import { createSlice } from 'react-redux'

const initialState ={
    todo:[]
}
export const taskSlice1 = createSlice(
{    name : 'task1',
    initialState,
    reducers:{
        addTask : (state,action)=>{
            state.todos.push(action.payload);
        }
    }}
)  

