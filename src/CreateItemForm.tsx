import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type CreateItemType = {
    createItem: (title: string) => void
}

const CreateItemForm = ({createItem}: CreateItemType) => {
    const [titleTask, setTitleTask] = useState ('')
    const [error, setError] = useState<string | null> (null)

    const onClickCreateItemHandler = () => {
        const trimTitleTask = titleTask.trim()
        if (trimTitleTask !== '') {
            createItem ( trimTitleTask)
            setTitleTask ('')
        } else {
            setError ('Title is required')
        }
    }

    const onChangeCreateItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTask (e.currentTarget.value)
        setError(null)
    }

    const onKeyDownCreateItemHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickCreateItemHandler ()
        }
    }

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth:'38px',
        minHeight: '38px',
    }

    return (

        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error ? error : 'Enter the value'}
                // helperText={error}
                variant="outlined"
                size={'small'}
                className={error ? 'error' : ''}
                value={titleTask}
                onChange={onChangeCreateItemHandler}
                onKeyDown={onKeyDownCreateItemHandler}
            />

            <Button variant="contained" style ={buttonStyle} onClick={onClickCreateItemHandler}>+</Button>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    );
};

export default CreateItemForm;