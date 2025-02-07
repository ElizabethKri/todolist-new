import Button from './Button.tsx';
import {ChangeEvent, useState} from 'react';

export type CreateItemType = {
    createItem: (title: string) => void
}

const CreateItemForm = ({createItem}: CreateItemType) => {
    const [titleTask, setTitleTask] = useState ('')
    const [error, setError] = useState<string | null> (null)

    const onClickCreateItemHandler = () => {
        const trimTitleTask = titleTask.trim ()
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


    return (

        <div>

            <input
                className={error ? 'error' : ''}
                value={titleTask}
                onChange={onChangeCreateItemHandler}
                onKeyDown={onKeyDownCreateItemHandler}
            />
            <Button title={'+'} onClick={onClickCreateItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default CreateItemForm;