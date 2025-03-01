import {addedTodolistAcc, todolistsReducer} from './todolists-reduce.ts';
import {tasksReducer} from './tasks-reduce.ts';
import {TasksState, TodolistType} from '../AppWithRedux.tsx';

describe('id', () => {
    test('ids should be equals', () => {
        const startTasksState: TasksState = {};
        const startTodolistsState: Array<TodolistType> = []

        const action = addedTodolistAcc('new todolist')

        const endTasksState = tasksReducer(startTasksState, action)
        const endTodolistState = todolistsReducer(startTodolistsState, action)

        const keys = Object.keys(endTasksState)
        const idFromTasks = keys[0]
        const idFromTodolists = endTodolistState[0].id

        expect(idFromTasks).toBe(action.payload.todolistId)
        expect(idFromTodolists).toBe(action.payload.todolistId)
    })
})