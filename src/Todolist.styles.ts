import {SxProps} from '@mui/material';

export const filterButtonContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}


export const getListItemsSx = (isDone: boolean): SxProps => ({
    padding: 0,
    opacity: isDone ? 0.5 : 1
})