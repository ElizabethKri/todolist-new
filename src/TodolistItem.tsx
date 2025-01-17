import {ButtonType, TaskType, Todolist} from './App.tsx';
import Button from './Button.tsx';
import {ChangeEvent, useState} from 'react';


export type TodolistItemType = {
    todolist: Todolist
    id: string
    title: string
    tasks: TaskType[]
    // date?: string
    deleteTaskId: (todoListID: string,taskId: string) => void
    filteredTasks: (todoListID: string, nameBtn: ButtonType) => void
    createTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, isDone: boolean, taskId: string) => void
    filter: ButtonType
    onClickDeleteTodolist: (todoListID: string) => void
}

const TodolistItem = (props: TodolistItemType) => {

    const {
        todolist: {id, title, filter},
        tasks,
        deleteTaskId,
        filteredTasks,
        createTask,
        changeTaskStatus,
        onClickDeleteTodolist
    } = props

    const [titleTask, setTitleTask] = useState ('')
    const [error, setError] = useState<string | null> (null)

    const onClickCreateTaskHandler = () => {
        const trimTitleTask = titleTask.trim ()
        if (trimTitleTask !== '') {
            createTask (id,trimTitleTask)
            setTitleTask ('')
        } else {
            setError ('Title is required')
        }
    }

    const onChangeCreateTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTask (e.currentTarget.value)
        setError(null)
    }

    const onKeyDownCreateTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickCreateTaskHandler ()
        }
    }

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeTaskStatus(id,e.currentTarget.checked, taskId)
    }

    const onClickDeleteTodolistHandler = () => {
        onClickDeleteTodolist(id)
    }

    // let currentTask = tasks
    //
    // if(filter === 'Active'){
    //
    //     currentTask = currentTask.filter(el => !el.isDone)
    // }
    // if(filter === 'Completed'){
    //     currentTask = currentTask.filter(el => el.isDone)
    // }

    return (
        <div>
            <Button title={'Remove todolist'} onClick={onClickDeleteTodolistHandler}/>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={titleTask}
                    onChange={onChangeCreateTaskHandler}
                    onKeyDown={onKeyDownCreateTaskHandler}
                />
                <Button title={'+'} onClick={onClickCreateTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {tasks.length === 0 ? <p>Задач нет</p> :
                <ul>
                    {tasks.map (t => {

                            // const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //     const newStatusValue = e.currentTarget.checked
                            //     changeTaskStatus (newStatusValue, t.id)
                            // }

                            return (
                                <li key={t.id} className={t.isDone ? "is-done" : ''}>
                                    <input type={'checkbox'} checked={t.isDone} onChange={(event) => onChangeCheckboxHandler(event, t.id)}/>
                                    <span>{t.title}</span>
                                    <Button title={'x'} onClick={() => deleteTaskId (id,t.id)}/>
                                </li>
                            )
                        }
                    )}
                </ul>
            }
            <div>
                <Button classname={filter === 'All' ? 'active-filter' : ''} title={'All'} onClick={() => filteredTasks (id,'All')}/>
                <Button classname={filter === 'Active' ? 'active-filter' : ''} title={'Active'} onClick={() => filteredTasks (id,'Active')}/>
                <Button classname={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => filteredTasks (id,'Completed')}/>
            </div>
            {/*<div>{date}</div>*/}
        </div>
    );
};

export default TodolistItem;