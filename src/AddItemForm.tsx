import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField
            error={!!error}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            size={'small'}
            className={error ? "error" : ""}
            id="outlined-basic"
            label={error ? error : "add task"}
            variant="outlined"
        />
        <Button
            onClick={addItem}
            style={stylesButtons}
            variant="contained">+</Button>
    </div>
}

const stylesButtons = {
    maxWidth: '40px',
    maxHeight: '40px',
    minWidth: '30px',
    minHeight: '30px',
    marginLeft: '10px',
}
