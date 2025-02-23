import {v1} from 'uuid';


type TodolistType = {
    id: string
    title: string
    filter: ButtonType
}
type ButtonType = 'All' | 'Active' | 'Completed'

export type RemoveTodolistActionsType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionsType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
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

export const  todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return   state.filter(el => el.id !== action.payload.id);
            // delete state[action.payload.id]

        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'All'}
            return [...state, newTodolist]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)


        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id ===  action.payload.id ? {...el, filter: action.payload.filter} : el)


        default: return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST' as const,
        payload: {
            id
        }
    }
}

export const addedTodolistAcc = (title: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        payload: {
            title,
            todolistId: v1()
        }
    }
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        payload: {
            id,
            title
        }
    }
}

export const changeTodolistFilterAC = (id: string, filter: ButtonType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        payload: {
            id,
            filter
        }
    }
}