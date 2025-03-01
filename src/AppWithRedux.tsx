import './App.css'
import TodolistItem from './TodolistItem.tsx';
import {useState} from 'react';
import CreateItemForm from './CreateItemForm.tsx';
import ButtonAppBar from './ButtonAppBar.tsx';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';

import {
    addedTodolistAcc,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './module/todolists-reduce.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './module/store.ts';

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

export const AppWithRedux = () => {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state =>  state.todolists)

    const filteredTasks = (payload: { todoListID: string, nameBtn: ButtonType }) => {
        const {todoListID, nameBtn} = payload
        dispatch(changeTodolistFilterAC(todoListID, nameBtn))
        // setTodolists (todolists.map (el => el.id === todoListID ? {...el, filter: nameBtn} : el))
    }



    const onClickDeleteTodolist = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
        // delete tasks[todoListID]
        // setTodolists ((prevState) => prevState.filter (el => el.id !== todoListID))
        // setTasks ({...tasks})
    }

    const createTodolist = (title: string) => {
        dispatch(addedTodolistAcc(title))
        // const newTodolist: TodolistType = {id: todolistId, title, filter: 'All'}
        //setTodolists ((prevState) => ([newTodolist, ...prevState]))
        // setTasks ((prevState) => ({...prevState, [todolistId]: []}))
    }



    const upgradeTitleTodolist = (payload: { todoListID: string, title: string }) => {
        const {todoListID, title} = payload
        dispatch(changeTodolistTitleAC(todoListID, title))
        // setTodolists (todolists.map (el => el.id === todoListID ? {...el, title} : el))
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
                        {todolists.map (el => {
                            return (
                                <Grid item sx={{p: '30px'}}>
                                    <Paper elevation={3} sx={{p: '15px', m: '20px'}}>
                                        <TodolistItem
                                            key={el.id}
                                            id={el.id}
                                            todolist={el}
                                            title={el.title}
                                            filteredTasks={filteredTasks}
                                            filter={el.filter}
                                            onClickDeleteTodolist={onClickDeleteTodolist}
                                            upgradeTitleTodolist={upgradeTitleTodolist}
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


