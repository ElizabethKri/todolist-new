import {ButtonType, TaskType} from './App.tsx';
import Button from './Button.tsx';
import {ChangeEvent, useState} from 'react';


export type TodolistItemType = {
    title: string
    tasks: TaskType[]
    date?: string
    deleteTaskId: (taskId: string) => void
    filteredTasks: (nameBtn: ButtonType) => void
    createTask: (title: string) => void
}

const TodolistItem = ({title, tasks, date, deleteTaskId, filteredTasks, createTask}: TodolistItemType) => {

    const [titleTask, setTitleTask] = useState('')

    const onClickCreateTaskHandler = () => {
        createTask(titleTask)
        setTitleTask('')
    }

    const onChangeCreateTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.currentTarget.value)
    }

    const onKeyDownCreateTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            onClickCreateTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleTask}
                       onChange={onChangeCreateTaskHandler}
                       onKeyDown={onKeyDownCreateTaskHandler}
                />
                <Button title={'+'} onClick={onClickCreateTaskHandler}/>
            </div>

                {tasks.length === 0 ? <p>Задач нет</p> :
                    <ul>
                        {tasks.map (t => {
                            return (
                                <li key={t.id}>
                                    <input type={'checkbox'} checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button title={'x'} onClick={() =>deleteTaskId(t.id)}/>
                                </li>
                            )}
                        )}
                    </ul>
                }
            <div>
                <Button title={'All'} onClick={()=>filteredTasks('All')}/>
                <Button title={'Active'} onClick={()=>filteredTasks('Active')}/>
                <Button title={'Completed'} onClick={()=>filteredTasks('Completed')}/>
            </div>
            <div>{date}</div>
        </div>
    );
};

export default TodolistItem;