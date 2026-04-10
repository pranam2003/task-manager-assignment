const { v4: uuidv4 } = require('uuid');


let tasks = [
    {
        id: uuidv4(),
        title: 'Learn React',
        completed: true,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        title: 'Build a Task Manager',
        completed: false,
        createdAt: new Date().toISOString()
    }
];

class TaskModel {
    static getAll() {
        return tasks;
    }

    static getById(id) {
        return tasks.find(t => t.id === id);
    }

    static create(title) {
        const newTask = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        return newTask;
    }

    static update(id, updates) {
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return null;

        
        const updatedTask = { ...tasks[taskIndex] };
        if (updates.title !== undefined) updatedTask.title = updates.title;
        if (updates.completed !== undefined) updatedTask.completed = updates.completed;

        tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    static delete(id) {
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return false;

        tasks.splice(taskIndex, 1);
        return true;
    }
}

module.exports = TaskModel;
