import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')

    /*    function getNewTaskTitle(event: ChangeEvent<HTMLInputElement>) {
            newTaskTitle = event.currentTarget.value
            setNewTaskTitle(newTaskTitle)
            console.log('newTaskTitle is   ' + newTaskTitle)
        }*/

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => setNewTaskTitle(event.currentTarget.value)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.ctrlKey && event.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTask = (): void => {
        if (newTaskTitle.trim() === '')
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onACompleteClickHandler = () => props.changeFilter("completed")


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input type={'text'}
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id)

                    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}> All</button>
            <button onClick={onActiveClickHandler}> Active</button>
            <button onClick={onACompleteClickHandler}> Completed</button>
        </div>
    </div>
}
