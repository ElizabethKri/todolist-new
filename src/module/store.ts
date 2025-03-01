import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reduce.ts';
import {tasksReducer} from './tasks-reduce.ts';



const rootReducer = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

// type AppRootState = {
//     todolists: TodolistType[],
//     tasks: TasksState
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store
