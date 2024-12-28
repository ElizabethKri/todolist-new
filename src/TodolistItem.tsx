import {TaskType} from './App.tsx';
import Button from './Button.tsx';

export type TodolistItemType = {
    title: string
    tasks: TaskType[]
    date?: string
}

const TodolistItem = ({title, tasks, date}: TodolistItemType) => {
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
                                </li>
                            )}
                        )}
                    </ul>
                }
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    );
};

export default TodolistItem;