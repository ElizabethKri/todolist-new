import {ChangeEvent, useState} from 'react';

export type EditableSpanType = {
    value: string
    idItem: string
    upgradeItemTitle: (value: string, idItem: string) => void
}

const EditableSpan = ({value, upgradeItemTitle, idItem}: EditableSpanType) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [upgradeTitle, setUpgradeTitle] = useState(value)

    const turnOnEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const onChangeHandlerValue = (e: ChangeEvent<HTMLInputElement>) => {
        setUpgradeTitle(e.currentTarget.value)
        if(isEditMode){
            upgradeItemTitle(value, idItem)
        }
    }

    return (
        isEditMode ?
            <input value={upgradeTitle}
                   onBlur={turnOnEditMode}
                   autoFocus
                   onChange={onChangeHandlerValue}/> :
            <span onDoubleClick={turnOnEditMode}>{upgradeTitle}</span>

);
};

export default EditableSpan;