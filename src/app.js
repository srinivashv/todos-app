const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let todos = [];

app.get('/todos', (_req, res) => res.json(todos));

app.post(
    '/todos', (req, res) => {
        const todo = req.body.todo;
        todos.push(todo);
        res.json({ success: true, todo });
    }
);

app.delete(
    '/todos/:index',
    (req, res) => {
        let index = parseInt(req.params.index, 10);
        if (index < todos.length && index >= 0) {
            todos.splice(index, 1);
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: "Todo not found" });
        }
    }
);

app.get('/health', (req, res) => res.json({ message: 'Server is up and running!' }));

const PORT = process.env.PORT || 4000;

app.listen(
    PORT,
    () => {
        console.log(`Server is running on port ${PORT}`);
    }
);
