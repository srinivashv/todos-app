let todos = [];
import { v4 as uuidv4 } from 'uuid';

const addTodo = (todo) => {
    const newTodo = { id: uuidv4(), text: req.body.todo };
    todos.push(newTodo);
};

const getAllTodos = () => {
    return res.json(todos);
};

const deleteTodo = () => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        return true;
    } else {
        throw Error('Todo not found');
    }
}

export const todosService = {
    addTodo,
    getAllTodos,
    deleteTodo
};