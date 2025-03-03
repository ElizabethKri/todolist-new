import './App.css'
import {useState} from 'react';
import ButtonAppBar from './ButtonAppBar.tsx';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';

import Todolist from './Todolist.tsx';
import {store} from './module/store.ts';
import {Provider} from 'react-redux';

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
                    <Provider store = {store}>
                        <Todolist/>
                    </Provider>
                </Container>
                <CssBaseline/>
            </ThemeProvider>
        </div>
    )
}


