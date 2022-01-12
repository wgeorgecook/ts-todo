import { useState } from 'react'
import { Button, Card, Checkbox, Input, Row  } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
  

type Id = {
    id: number;
};

type Todo = Id & {
    title?: string;
    text?: string;
    done?: boolean;
};


const useTodo = (t: Todo, delFunc: (key: string) => void) => {
    const { TextArea } = Input;
    const [ title, setTitle ] = useState(t.title);
    const [ text, setText ] = useState(t.text);
    const [ done, setDone ] = useState(false);
    const key = `${t.id} + ${done}`

    const updateTitle = (s: string) => {
        setTitle(s);
    }

    const updateText = (s: string) => {
        setText(s);
    }

    const toggleDone = (e: CheckboxChangeEvent) => {
        setDone(e.target.checked);
    }

    return (
        <Card 
            className={"todo"}
            key={key} 
            id={key}
            style={{ 
                maxWidth: "300px", 
                margin: "auto", 
                marginTop: "1em", 
                padding: ".25em"
            }}
            title={
            <Input 
                value={title}
                placeholder={'What\'s there todo?'} 
                onChange={(e) => updateTitle(e.target.value)}
                disabled={done}
            />
        }
        >
            <span style={{marginTop: ".1em"}}>
                <TextArea
                    value={text}
                    placeholder={'Some additional details'} 
                    onChange={(e) => updateText(e.target.value)}
                    disabled={done}
                />
                <span><Checkbox onChange={(e) => toggleDone(e)} style={{marginLeft: ".25em", marginTop: ".25em"}}> Complete </Checkbox></span>
                <p style={{marginTop: ".25em"}}><button onClick={() => delFunc(`${t.id} + ${done}`)}>Delete todo</button></p>
            </span>
        </Card>
    )

};


const TodosComponent = (): JSX.Element => {

    const [idCounter, setIdCounter] = useState(1);
    const [todos, setTodos] = useState<JSX.Element[]>([]);

    const deleteTodo = (key: string): void => {
        setTodos(prevState => prevState.filter(d => d.key !== key));
    };

    const baseTodo: JSX.Element = useTodo({id: idCounter}, deleteTodo);

    const clickHandler = () => {
        setIdCounter(prevState => prevState + 1);
        setTodos(prevState => [...prevState, baseTodo]); 
    };

    return (
        <> 
            <Button 
                style={{margin: 'auto', marginTop: '.5em'}}
                onClick={clickHandler}
            > 
                Create new todo
            </Button>
            <Row gutter={[5, 5]}>
                {todos}
            </Row>
        </> 
    )
};

export default TodosComponent;