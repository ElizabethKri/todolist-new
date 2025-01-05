import {ButtonType, TaskType} from './App.tsx';
import Button from './Button.tsx';

export type TodolistItemType = {
    title: string
    tasks: TaskType[]
    date?: string
    deleteTaskId: (taskId: number) => void
    filteredTasks: (nameBtn: ButtonType) => void

}

const TodolistItem = ({title, tasks, date, deleteTaskId, filteredTasks}: TodolistItemType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

                {tasks.length === 0 ? <p>Задач нет</p> :
                    <ul>
                        {tasks.map (t => {
                            return (
                                <li key={t.id}>
                                    <input type={'checkbox'} checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button title={'x'} onClick={() =>deleteTaskId(t.id)}/>
                                </li>
                            )}
                        )}
                    </ul>
                }
            <div>
                <Button title={'All'} onClick={()=>filteredTasks('All')}/>
                <Button title={'Active'} onClick={()=>filteredTasks('Active')}/>
                <Button title={'Completed'} onClick={()=>filteredTasks('Completed')}/>
            </div>
            <div>{date}</div>
        </div>
    );
};

export default TodolistItem;