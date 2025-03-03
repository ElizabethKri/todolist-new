import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {todolistsReducer} from './todolists-reduce.ts';
import {tasksReducer} from './tasks-reduce.ts';
import {useSelector} from 'react-redux';



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

export const store = configureStore({reducer: rootReducer});

export const useAppSelector = useSelector.withTypes<AppRootState>()

// @ts-ignore
window.store = store
