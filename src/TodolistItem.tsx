import {ButtonType, TaskType, Todolist} from './App.tsx';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {ChangeEvent} from 'react';
import CreateItemForm from './CreateItemForm.tsx';
import EditableSpan from './EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import {filterButtonContainerSx, getListItemsSx} from './Todolist.styles.ts';

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
            <h3><EditableSpan value={title} idItem={id} upgradeItemTitle={upgradeTitleTodolistHandler}/>
                <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <div>
                <CreateItemForm createItem = {createItem}/>
                <h4 style={{padding: '0px', margin: '0px'}}> Remove tasks
                    <IconButton  aria-label="delete" onClick={() =>removeTaskHandler(id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </h4>
            </div>


            {tasks.length === 0 ? <p>There are no tasks, add new tasks.</p> :
                <List>
                    {currentTask.map (t => {
                            return (
                                <ListItem  key={t.id}
                                           sx={getListItemsSx(t.isDone)}>
                                    <Checkbox checked={t.isDone} onChange={(event)=>onChangeCheckboxHandler(event, t.id)}/>
                                    <EditableSpan value={t.title} upgradeItemTitle ={upgradeTitleItemHandler} idItem={t.id}/>
                                    <IconButton aria-label="delete" onClick={() => deleteTaskId ({todoListID:id,taskId:t.id})}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </ListItem>
                            )
                        }
                    )}
                </List>
            }

            <Box sx={filterButtonContainerSx}>
            <Button variant={filter === 'All' ? 'outlined' : "contained"}
                    color="secondary"
                    onClick={() => filteredTasks ({todoListID: id,nameBtn:'All'})}
            >All</Button>
            <Button variant={filter === 'Active' ? 'outlined' : "contained"}
                    color="success"
                    onClick={() => filteredTasks ({todoListID: id,nameBtn:'Active'})}
            >Active</Button>
            <Button variant={filter === 'Completed' ? 'outlined' : "contained"}
                    color="error"
                    onClick={() => filteredTasks ({todoListID:id,nameBtn:'Completed'})}
            >Completed</Button>
            </Box>
        </div>
    );
};

export default TodolistItem;