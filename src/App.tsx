import './App.css'
import TodolistItem from './TodolistItem.tsx';
import {useState} from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type ButtonType = 'All' | 'Active' | 'Completed'

export const App  =  () => {
    const [tasks, setTasks] = useState<TaskType[] >(
        [
            { id: 1, title: 'HTML&CSS', isDone: true },
            { id: 2, title: 'JS', isDone: true },
            { id: 3, title: 'ReactJS', isDone: false },
            { id: 4, title: 'Redux', isDone: false },
            { id: 5, title: 'Angular', isDone: false },
            { id: 6, title: 'Vue', isDone: false },
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


    const deleteTaskId = (taskId: number) => {
        const filteredTask = tasks.filter(el => el.id !== taskId)
        setTasks(filteredTask)
}

  return (
      <div className="app">
      <TodolistItem title={'What to learn'} tasks = {currentTask} date={'28.12.2024'} deleteTaskId={deleteTaskId} filteredTasks={filteredTasks}/>
      </div>
  )
}


