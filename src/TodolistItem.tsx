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
    changeTaskStatus: (isDone: boolean, taskId: string) => void
    filter: ButtonType
}

const TodolistItem = ({
                          title,
                          tasks,
                          date,
                          deleteTaskId,
                          filteredTasks,
                          createTask,
                          changeTaskStatus,
                          filter
                      }: TodolistItemType) => {

    const [titleTask, setTitleTask] = useState ('')
    const [error, setError] = useState<string | null> (null)

    const onClickCreateTaskHandler = () => {
        const trimTitleTask = titleTask.trim ()
        if (trimTitleTask !== '') {
            createTask (trimTitleTask)
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
        changeTaskStatus(e.currentTarget.checked, taskId)
    }



    return (
        <div>
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
                                    <Button title={'x'} onClick={() => deleteTaskId (t.id)}/>
                                </li>
                            )
                        }
                    )}
                </ul>
            }
            <div>
                <Button classname={filter === 'All' ? 'active-filter' : ''} title={'All'} onClick={() => filteredTasks ('All')}/>
                <Button classname={filter === 'Active' ? 'active-filter' : ''} title={'Active'} onClick={() => filteredTasks ('Active')}/>
                <Button classname={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => filteredTasks ('Completed')}/>
            </div>
            <div>{date}</div>
        </div>
    );
};

export default TodolistItem;