import { Router } from 'express';
import { todosService } from './todos.service';

const todosRouter = Router();

todosRouter.get('/', (_req, res) => res.send(todosService.getAllTodos()));

todosRouter.post(
    '/', (req, res) => {
        const todo = req.body.todo;
        todosService.addTodo(todo);
        res.status(201).json({ success: true, todo });
    }
);

todosRouter.delete(
    '/:id',
    (req, res) => {
        try {
            const id = req.params.id;
            const response = todosService.deleteTodo(id);
            return res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ success: false, message: error });
        }

    }
);

export { todosRouter as todosRoutes };
