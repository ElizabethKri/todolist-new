import {v1} from 'uuid';


type TodolistType = {
    id: string
    title: string
    filter: ButtonType
}
type ButtonType = 'All' | 'Active' | 'Completed'

const todolistId1 = v1 ()
const todolistId2 = v1 ()

const initialState: TodolistType[] = ([
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
])

type RemoveTodolistActionsType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

type AddTodolistActionsType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

type ChangeTodolistTitleActionsType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

type ChangeTodolistFilterActionsType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: ButtonType
    }
}

type ActionsType = RemoveTodolistActionsType | AddTodolistActionsType | ChangeTodolistTitleActionsType | ChangeTodolistFilterActionsType

export const  todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type){
        case 'REMOVE-TODOLIST':{
            return   state.filter(el => el.id !== action.payload.id)
            // delete state[action.payload.id]
        }
        case 'ADD-TODOLIST':{
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case 'CHANGE-TODOLIST-FILTER':{
            const todolistId = action.payload.id
            return state.map(el => el.id === todolistId ? {...el, filter: action.payload.filter} : el)
        }

        default: return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addedTodolistAcc = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: ButtonType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}