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
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './module/store.ts';
import {
    addTaskAC,
    changeStatusTaskAC,
    removeAllTaskAC,
    removeTaskAC,
    upgradeTitleTaskAC
} from './module/tasks-reduce.ts';
import {ButtonType, TaskType, TodolistType} from './AppWithRedux.tsx';

export type TodolistItemType = {
    todolist: TodolistType
    id: string
    title: string
    filteredTasks: (payload: {todoListID: string,nameBtn: ButtonType}) => void
    filter: ButtonType
    onClickDeleteTodolist: (todoListID: string) => void
    upgradeTitleTodolist: (payload: {todoListID: string, title: string}) => void
}

const TodolistItem = (props: TodolistItemType) => {

    const {
        todolist: {id, title, filter},
        filteredTasks,
        onClickDeleteTodolist,
        upgradeTitleTodolist,
    } = props

    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const deleteTaskId = (payload: { todoListID: string, taskId: string }) => {
        const {todoListID, taskId} = payload
        dispatch(removeTaskAC(todoListID, taskId))
    }


    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(changeStatusTaskAC(id, e.currentTarget.checked, taskId))
    }

    const onClickDeleteTodolistHandler = () => {
        onClickDeleteTodolist(id)
    }

    const createItem = (title: string) => {
        dispatch(addTaskAC(id,title))
    }

    const upgradeTitleItemHandler = (idItem: string, value: string) => {
        dispatch(upgradeTitleTaskAC(id, idItem, value))
    }

    const upgradeTitleTodolistHandler = (title: string) => {
        upgradeTitleTodolist({todoListID: id, title})
    }

    const removesTaskHandler = (idItem: string,) => {
        dispatch(removeAllTaskAC(id, idItem))
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
                    <IconButton  aria-label="delete" onClick={() =>removesTaskHandler(id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </h4>
            </div>


            {tasks?.length === 0 ? <p>There are no tasks, add new tasks.</p> :
                <List>
                    {currentTask?.map (t => {
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