import './App.css'
import TodolistItem from './TodolistItem.tsx';
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import CreateItemForm from './CreateItemForm.tsx';
import ButtonAppBar from './ButtonAppBar.tsx';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {
    addTaskAC,
    changeStatusTaskAC,
    removeAllTaskAC,
    removeTaskAC,
    tasksReducer,
    upgradeTitleTaskAC
} from './module/tasks-reduce.ts';
import {
    addedTodolistAcc,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './module/todolists-reduce.ts';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: ButtonType
}

export type TasksState = Record<string, TaskType[]>

export type ButtonType = 'All' | 'Active' | 'Completed'

export type ThemeMode = 'light' | 'dark'

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

    const todolistId1 = v1 ()
    const todolistId2 = v1 ()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1 (), title: 'HTML&CSS', isDone: true},
            {id: v1 (), title: 'JS', isDone: true},
            {id: v1 (), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1 (), title: 'Rest API', isDone: true},
            {id: v1 (), title: 'GraphQL', isDone: false},
        ],
    })


    // const [filter, setFilter] = useState<ButtonType>('All')

    const filteredTasks = (payload: { todoListID: string, nameBtn: ButtonType }) => {
        const {todoListID, nameBtn} = payload
        dispatchTodolists(changeTodolistFilterAC(todoListID, nameBtn))
        // setTodolists (todolists.map (el => el.id === todoListID ? {...el, filter: nameBtn} : el))
    }

    const deleteTaskId = (payload: { todoListID: string, taskId: string }) => {
        const {todoListID, taskId} = payload
        dispatchTasks(removeTaskAC(todoListID, taskId))
        // setTasks ((prevState) => ({
        //     ...prevState,
        //     [todoListID]: prevState[todoListID].filter (el => el.id !== taskId)
        // }))
        // const filteredTask = tasks.filter (el => el.id !== taskId)
        // setTasks (filteredTask)
    }

    const createTask = (payload: { todoListID: string, title: string }) => {
        const {todoListID, title} = payload
        dispatchTasks(addTaskAC(todoListID, title))
        // let newTask = {id: v1 (), title, isDone: false}
        // return setTasks ([newTask, ...tasks])
        // setTasks ((prevState) => ({
        //     ...prevState,
        //     [todoListID]: [...prevState[todoListID], newTask]
        // }))
    }

    const changeTaskStatus = (payload: { todoListID: string, isDone: boolean, taskId: string }) => {
        const {todoListID, isDone, taskId} = payload
        dispatchTasks(changeStatusTaskAC(todoListID, isDone, taskId))
        // const task = tasks.find(el => el.id === taskId)
        // if(task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }

        // const newTask = tasks.map (el => el.id === taskId ? {...el, isDone} : el)
        // setTasks (newTask)

        // setTasks ((prevState) => ({
        //     ...prevState,
        //     [todoListID]: prevState[todoListID].map (el => el.id === taskId ? {...el, isDone} : el)
        // }))
    }

    const onClickDeleteTodolist = (todoListID: string) => {
        dispatchTodolists(removeTodolistAC(todoListID))
        dispatchTasks(removeTodolistAC(todoListID))
        // delete tasks[todoListID]
        // setTodolists ((prevState) => prevState.filter (el => el.id !== todoListID))
        // setTasks ({...tasks})
    }

    const createTodolist = (title: string) => {
        dispatchTodolists(addedTodolistAcc(title))
        dispatchTasks(addedTodolistAcc(title))
        // const newTodolist: TodolistType = {id: todolistId, title, filter: 'All'}
        //setTodolists ((prevState) => ([newTodolist, ...prevState]))
        // setTasks ((prevState) => ({...prevState, [todolistId]: []}))
    }

    const upgradeTitleTask = (payload: { todoListID: string, taskId: string, title: string }) => {
        const {todoListID, taskId, title} = payload
        dispatchTasks(upgradeTitleTaskAC(todoListID, taskId, title))
        // setTasks ((prevState) => ({
        //     ...prevState,
        //     [todoListID]: prevState[todoListID].map (el => el.id === taskId ? {...el, title} : el)
        // }))
    }

    const upgradeTitleTodolist = (payload: { todoListID: string, title: string }) => {
        const {todoListID, title} = payload
        dispatchTodolists(changeTodolistTitleAC(todoListID, title))
        // setTodolists (todolists.map (el => el.id === todoListID ? {...el, title} : el))
    }

    const removeTasks = (payload: { todoListID: string, taskId: string }) => {
        const {todoListID, taskId} = payload
        dispatchTasks(removeAllTaskAC(todoListID, taskId))
        // setTasks ((prevState) => ({...prevState, [todoListID]: prevState[todoListID].filter (el => el.id === taskId)}))
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const materialTheme = createTheme ({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#ffad4c',
            }
        }
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <div className="app">
            <ThemeProvider theme={materialTheme}>
                <Container fixed>
                    <ButtonAppBar onChangeMode={changeModeHandler}/>

                    <Grid container spacing={1} sx={{ml: '20px'}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={1}>
                        //ошибка исчезнет, если уберем initialState (используется хук useReducer)
                        {todolists.map (el => {
                            //const todoTasks = tasks[el.id] || []
                            return (
                                <Grid item sx={{p: '30px'}}>
                                    <Paper elevation={3} sx={{p: '15px', m: '20px'}}>
                                        <TodolistItem
                                            key={el.id}
                                            id={el.id}
                                            todolist={el}
                                            title={el.title}
                                            tasks={tasks[el.id]}
                                            deleteTaskId={deleteTaskId}
                                            filteredTasks={filteredTasks}
                                            createTask={createTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={el.filter}
                                            onClickDeleteTodolist={onClickDeleteTodolist}
                                            upgradeTitleTask={upgradeTitleTask}
                                            upgradeTitleTodolist={upgradeTitleTodolist}
                                            removeTasks={removeTasks}
                                        />
                                    </Paper>
                                </Grid>)
                        })}
                    </Grid>
                </Container>
                <CssBaseline/>
            </ThemeProvider>
        </div>
    )
}


