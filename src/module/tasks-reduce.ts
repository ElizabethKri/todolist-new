import {TasksState, TaskType} from '../App.tsx';
import {v1} from 'uuid';

export const tasksReducer = (state: TasksState, action:TaskReducerActionType): TasksState => {
    switch (action.type){
        case 'REMOVE-TASK': {
            return ({...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskId)
        })}
        case 'ADD-TASK':{
            let newTask: TaskType = {id: v1 (), title: action.payload.title, isDone: false}
            return ({...state,
                [action.payload.todoListID]: [...state[action.payload.todoListID], newTask]
            })
        }

        case 'UPGRADE-TITLE-TASK':{
            return ({ ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            })
        }

        case 'CHANGE-STATUS-TASK':{
            return ({...state,
            [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)
            })
        }

        case 'REMOVE-ALL-TASK':{
            return ({ ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id === action.payload.taskId)
            })
        }

        case 'DELETE-TODOLIST-TASK':{
            return {...state}
        }

        case 'CREATE-TODOLIST-TASK': {
            return ({...state,
                [action.payload.todoListID]: []
            })
        }

        default: return state
    }
}

type TaskReducerActionType = RemoveTaskACType |
    addTaskACType |
    upgradeTitleTaskACType |
    changeStatusTaskACType |
    removeAllTaskACType |
    onClickDeleteTodolistTaskACType |
    createTodolistTasksACType

type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    payload: {
        todoListID: string,
        taskId: string
    }
}

type addTaskACType = {
    type: 'ADD-TASK',
    payload: {
        todoListID: string,
        title: string
    }
}

type upgradeTitleTaskACType = {
    type: 'UPGRADE-TITLE-TASK',
    payload: {
        todoListID: string,
        taskId: string,
        title: string
    }
}

type changeStatusTaskACType = {
    type: 'CHANGE-STATUS-TASK',
    payload: {
        todoListID: string,
        isDone: boolean,
        taskId: string
    }
}

type removeAllTaskACType = {
    type: 'REMOVE-ALL-TASK',
    payload: {
        todoListID: string,
        taskId: string
    }
}

type onClickDeleteTodolistTaskACType = {
    type: "DELETE-TODOLIST-TASK"
}

type createTodolistTasksACType = {
    type: 'CREATE-TODOLIST-TASK',
    payload: {
        todoListID: string
    }
}

export const removeTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todoListID
        }
    } as const
}

export  const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            title
        }
    } as const
}

export const upgradeTitleTaskAC = (todoListID: string, taskId: string, title: string) => {
    return {
        type: 'UPGRADE-TITLE-TASK',
        payload: {
            todoListID,
            taskId,
            title
        }
    } as const
}

export const changeStatusTaskAC = ( todoListID: string, isDone: boolean, taskId: string) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todoListID,
            isDone,
            taskId
        }
    } as const
}

export const removeAllTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: 'REMOVE-ALL-TASK',
        payload: {
            todoListID,
            taskId
        }
    } as const
}

export const onClickDeleteTodolistTasksAC = () => {
    return {
        type: "DELETE-TODOLIST-TASK"
    } as const
}

export const createTodolistTasksAC = (todoListID: string) => {
    return {
        type: 'CREATE-TODOLIST-TASK',
        payload: {
            todoListID
        }
    } as const
}