import {ButtonType, TaskType, Todolist} from './App.tsx';
import Button from './Button.tsx';
import {ChangeEvent} from 'react';
import CreateItemForm from './CreateItemForm.tsx';
import EditableSpan from './EditableSpan.tsx';


export type TodolistItemType = {
    todolist: Todolist
    id: string
    title: string
    tasks: TaskType[]
    // date?: string
    deleteTaskId: (payload: {todoListID: string, taskId: string}) => void
    filteredTasks: (payload: {todoListID: string,nameBtn: ButtonType}) => void
    createTask: (payload: {todoListID: string,title: string}) => void
    changeTaskStatus: (payload: {todoListID: string, isDone: boolean, taskId: string}) => void
    filter: ButtonType
    onClickDeleteTodolist: (todoListID: string) => void
    upgradeTitleTask: (payload: {todoListID: string, taskId: string, title: string}) => void
    upgradeTitleTodolist: (payload: {todoListID: string, title: string}) => void
    removeTasks: (payload: {todoListID: string,taskId: string}) => void
}

const TodolistItem = (props: TodolistItemType) => {

    const {
        todolist: {id, title, filter},
        tasks,
        createTask,
        deleteTaskId,
        filteredTasks,
        changeTaskStatus,
        onClickDeleteTodolist,
        upgradeTitleTask,
        upgradeTitleTodolist,
        removeTasks
    } = props



    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeTaskStatus({todoListID: id,isDone: e.currentTarget.checked,taskId})
    }

    const onClickDeleteTodolistHandler = () => {
        onClickDeleteTodolist(id)
    }

    const createItem = (title: string) => {
        createTask({todoListID: id, title})
    }

    const upgradeTitleItemHandler = (idItem: string, value: string) => {
        upgradeTitleTask({todoListID: id, taskId: idItem,title: value})
    }

    const upgradeTitleTodolistHandler = (title: string) => {
        upgradeTitleTodolist({todoListID: id, title})
    }

    const removeTaskHandler = (idItem: string,) => {
        removeTasks({todoListID:id, taskId:idItem})
    }


    let currentTask = tasks

    if(filter === 'Active'){

        currentTask = currentTask.filter(el => !el.isDone)
    }
    if(filter === 'Completed'){
        currentTask = currentTask.filter(el => el.isDone)
    }


    return (
        <div>
            <Button title={'Remove todolist'} onClick={onClickDeleteTodolistHandler}/>
            <h3><EditableSpan value={title} idItem={id} upgradeItemTitle={upgradeTitleTodolistHandler}/></h3>
            <div>
                <CreateItemForm createItem = {createItem}/>
                <Button title={'Remove tasks'} onClick={() =>removeTaskHandler(id)}/>
            </div>

            {tasks.length === 0 ? <p>Задач нет</p> :
                <ul>
                    {currentTask.map (t => {

                            // const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //     const newStatusValue = e.currentTarget.checked
                            //     changeTaskStatus (newStatusValue, t.id)
                            // }

                            return (
                                <li key={t.id} className={t.isDone ? "is-done" : ''}>
                                    <input type={'checkbox'} checked={t.isDone} onChange={(event) => onChangeCheckboxHandler(event, t.id)}/>
                                    <EditableSpan value={t.title} upgradeItemTitle ={upgradeTitleItemHandler} idItem={t.id}/>
                                    <Button title={'x'} onClick={() => deleteTaskId ({todoListID:id,taskId:t.id})}/>
                                </li>
                            )
                        }
                    )}
                </ul>
            }
            <div>
                <Button classname={filter === 'All' ? 'active-filter' : ''} title={'All'} onClick={() => filteredTasks ({todoListID: id,nameBtn:'All'})}/>
                <Button classname={filter === 'Active' ? 'active-filter' : ''} title={'Active'} onClick={() => filteredTasks ({todoListID: id,nameBtn:'Active'})}/>
                <Button classname={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => filteredTasks ({todoListID:id,nameBtn:'Completed'})}/>
            </div>
            {/*<div>{date}</div>*/}
        </div>
    );
};

export default TodolistItem;