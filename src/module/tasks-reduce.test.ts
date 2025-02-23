import {v1} from 'uuid';
import {TasksState} from '../App.tsx';
import {
    addTaskAC,
    changeStatusTaskAC,
    createTodolistTasksAC,
    removeTaskAC,
    tasksReducer,
    upgradeTitleTaskAC
} from './tasks-reduce.ts';

let startState: TasksState
const todolistId1 = v1 ()
const todolistId2 = v1 ()

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    }
})

describe('removed', () => {
    test('correct task should be deleted from correct array',() => {
        const action = removeTaskAC(todolistId2, '2')
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(3)
        expect(endState[todolistId2].length).toBe(1)
        expect(endState[todolistId2].every(t => t.id != '2')).toBeTruthy()

    })
})


describe('added', () => {
    test('correct task should be added from correct array',() => {
        const action = addTaskAC(todolistId2, 'TDD')
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(3)
        expect(endState[todolistId2].length).toBe(3)
        expect(endState[todolistId2][2].id).toBeDefined()
        expect(endState[todolistId2][2].title).toBe('TDD')
        expect(endState[todolistId2][2].isDone).toBe(false)

    })
})

describe('change status', () => {
    test('status of specified task should be changed',() => {
        const action = changeStatusTaskAC(todolistId2, false, '1')
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId2][0].isDone).toBeFalsy()
        expect(endState[todolistId1][0].isDone).toBeTruthy()

    })
})

describe('change title', () => {
    test('title of specified task should be changed',() => {
        const action = upgradeTitleTaskAC(todolistId2,  '2', 'Unit Test')
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId2][1].title).toBe('Unit Test')
        expect(endState[todolistId1][1].title).toBe('JS')

    })
})

describe('create Todolist added task', () => {
    test('new array should be added when new todolist is added',() => {
        const action = createTodolistTasksAC('new todolist')
        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState)
        const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
        if(!newKey){
            throw Error('new key should be added')
        }

        expect(keys.length).toBe(3)
        expect(endState[newKey]).toStrictEqual([])

    })
})



