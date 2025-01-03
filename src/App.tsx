import './App.css'
import TodolistItem from './TodolistItem.tsx';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App  =  () => {
    const tasks1: TaskType[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Angular', isDone: false },
        { id: 6, title: 'Vue', isDone: false },
    ]


  return (
      <div className="app">
      <TodolistItem title={'What to learn'} tasks = {tasks1} date={'28.12.2024'}/>
      </div>
  )
}


