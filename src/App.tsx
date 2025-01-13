import './App.css'
import TodolistItem from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ButtonType = 'All' | 'Active' | 'Completed'

export const App  =  () => {
    const [tasks, setTasks] = useState<TaskType[] >(
        [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Angular', isDone: false },
            { id: v1(), title: 'Vue', isDone: false },
        ]
    )

    const [filter, setFilter] = useState<ButtonType>('All')


    let currentTask = tasks

    if(filter === 'Active'){

        currentTask = tasks.filter(el => !el.isDone)
    }
    if(filter === 'Completed'){
        currentTask = tasks.filter(el => el.isDone)
    }


    const filteredTasks = (nameBtn: ButtonType) => {
        setFilter(nameBtn)
    }


    const deleteTaskId = (taskId: string) => {
        const filteredTask = tasks.filter(el => el.id !== taskId)
        setTasks(filteredTask)
}

    const createTask = (title: string) => {
        let newTask = { id: v1(), title, isDone: false}
        return setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (isDone: boolean, taskId: string) => {
        // const task = tasks.find(el => el.id === taskId)
        // if(task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }

        const newTask = tasks.map(el => el.id === taskId ? {...el, isDone} : el)
        setTasks(newTask)

    }

  return (
      <div className="app">
      <TodolistItem title={'What to learn'}
                    tasks = {currentTask}
                    date={'28.12.2024'}
                    deleteTaskId={deleteTaskId}
                    filteredTasks={filteredTasks}
                    createTask = {createTask}
                    changeTaskStatus = {changeTaskStatus}
                    filter = {filter}
      />
      </div>
  )
}


