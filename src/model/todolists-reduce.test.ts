import {v1} from 'uuid';
import {
    addedTodolistAcc,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reduce';

type TodolistType = {
    id: string
    title: string
    filter: ButtonType
}
type ButtonType = 'All' | 'Active' | 'Completed'

describe ('removed', () => {
    test ('correct todolist should be removed', () => {

        const todolistId1 = v1 ()
        const todolistId2 = v1 ()

        //1. начальный state
        const startState: TodolistType[] = ([
            {id: todolistId1, title: 'What to learn', filter: 'All'},
            {id: todolistId2, title: 'What to buy', filter: 'All'},
        ])

        //2. Действие
        // const action = {
        //     type: 'REMOVE-TODOLIST',
        //     payload: {
        //         id: todolistId1
        //     }
        // } as const

        const endState = todolistsReducer (startState, removeTodolistAC(todolistId1))

        //3. Проверяем, что наши действия (изменения state) соответствует ожиданиям
        //в массиве останется один тудулист
        expect (endState.length).toBe (1)
        //удалится нужный тудулист, а не любой
        expect (endState[0].id).toBe (todolistId2)
    })
})

describe ('added', () => {
    test ('correct todolist should be added', () => {

        const todolistId1 = v1 ()
        const todolistId2 = v1 ()

        const startState: TodolistType[] = ([
            {id: todolistId1, title: 'What to learn', filter: 'All'},
            {id: todolistId2, title: 'What to buy', filter: 'All'},
        ])

        // const action = {
        //     type: 'ADD-TODOLIST',
        //     payload: {
        //         title: 'New Todolist'
        //     }
        // } as const

        const endState = todolistsReducer(startState, addedTodolistAcc('New Todolist'))

        expect(endState.length).toBe(3)
        expect(endState[2].title).toBe('New Todolist')
    })
})

describe('change', () => {
    test('correct todolist should change its name', () => {
        const todolistId1 = v1 ()
        const todolistId2 = v1 ()

        const startState: TodolistType[] = ([
            {id: todolistId1, title: 'What to learn', filter: 'All'},
            {id: todolistId2, title: 'What to buy', filter: 'All'},
        ])

        // const action = {
        //     type: 'CHANGE-TODOLIST-TITLE',
        //     payload: {
        //         id: todolistId2,
        //         title: 'New Todolist'
        //     }
        // } as const

        const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,'New Todolist' ))

        expect(endState[0].title).toBe('What to learn')
        expect(endState[1].title).toBe('New Todolist')
    })
})

describe('filter', () => {
    test('correct filter of todolist should be changed', () => {
        const todolistId1 = v1 ()
        const todolistId2 = v1 ()

        const startState: TodolistType[] = ([
            {id: todolistId1, title: 'What to learn', filter: 'All'},
            {id: todolistId2, title: 'What to buy', filter: 'All'},
        ])

        // const action = {
        //     type: 'CHANGE-TODOLIST-FILTER',
        //     payload: {
        //         id: todolistId2,
        //         filter: 'Completed'
        //     }
        // } as const

        const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'Completed'))

        expect(endState[0].filter).toBe('All')
        expect(endState[1].filter).toBe('Completed')
    })
})