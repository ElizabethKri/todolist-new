import './App.css'
import TodolistItem from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: ButtonType
}

export type TasksState = Record<string, TaskType[]>

export type ButtonType = 'All' | 'Active' | 'Completed'

export const App = () => {

    // const [todolists, setTodolists] = useState<Todolist[]> ([
    //     {id: v1 (), title: 'What to learn', filter: 'All'},
    //     {id: v1 (), title: 'What to buy', filter: 'All'},
    // ])
    //
    // const [tasks, setTasks] = useState<TaskType[]> (
    //     [
    //         {id: v1 (), title: 'HTML&CSS', isDone: true},
    //         {id: v1 (), title: 'JS', isDone: true},
    //         {id: v1 (), title: 'ReactJS', isDone: false},
    //         {id: v1 (), title: 'Redux', isDone: false},
    //         {id: v1 (), title: 'Angular', isDone: false},
    //         {id: v1 (), title: 'Vue', isDone: false},
    //     ]
    // )

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })


    // const [filter, setFilter] = useState<ButtonType>('All')

    const filteredTasks = (todoListID: string,nameBtn: ButtonType) => {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: nameBtn} : el))
    }


    const deleteTaskId = (todoListID: string, taskId: string) => {
        setTasks({...tasks,
        [todoListID] : tasks[todoListID].filter(el => el.id !== taskId)
        })
        // const filteredTask = tasks.filter (el => el.id !== taskId)
        // setTasks (filteredTask)
    }

    const createTask = (todoListID: string,title: string) => {
        let newTask = {id: v1 (), title, isDone: false}
        // return setTasks ([newTask, ...tasks])
        setTasks({...tasks,
        [todoListID]: [...tasks[todoListID], newTask]
        })
    }

    const changeTaskStatus = (todoListID: string, isDone: boolean, taskId: string) => {
        // const task = tasks.find(el => el.id === taskId)
        // if(task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }

        // const newTask = tasks.map (el => el.id === taskId ? {...el, isDone} : el)
        // setTasks (newTask)

        setTasks({...tasks,
        [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone} : el)
        })

        setTasks((prevState)=>({...prevState,
        [todoListID]: prevState[todoListID].map(el => el.id === taskId ? {...el, isDone} : el)
        }))

    }

    const onClickDeleteTodolist = (todoListID: string) => {
        setTodolists((prevState) =>prevState.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }


    return (
        <div className="app">

            {/*{*/}
            {/*    todolists.map (el => {*/}
            {/*        let currentTask = tasks[el.id]*/}

            {/*        if(el.filter === 'Active'){*/}

            {/*            currentTask = currentTask.filter(el => !el.isDone)*/}
            {/*        }*/}
            {/*        if(el.filter === 'Completed'){*/}
            {/*            currentTask = currentTask.filter(el => el.isDone)*/}
            {/*        }*/}

            {todolists.map(el => {
                return  <TodolistItem
                    key = {el.id}
                    id = {el.id}
                    todolist={el}
                    title={el.title}
                    tasks={tasks[el.id]}
                    deleteTaskId={deleteTaskId}
                    filteredTasks={filteredTasks}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={el.filter}
                    onClickDeleteTodolist={onClickDeleteTodolist}
                />

            })}




        </div>
    )
}


