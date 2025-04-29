import { useState, useEffect } from 'react';
import axios from 'axios';

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3001/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!title.trim()) return;
        await axios.post('http://localhost:3001/tasks', { title });
        setTitle('');
        fetchTasks();
    };

    const deleteTask = async (id: number) => {
        await axios.delete(`http://localhost:3001/tasks/${id}`);
        fetchTasks();
    };

    const toggleTask = async (id: number, completed: boolean) => {
        await axios.put(`http://localhost:3001/tasks/${id}`, {
            completed: !completed
        });
        fetchTasks();
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Mina uppgifter</h1>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ny uppgift"
            />
            <button onClick={addTask}>Lägg till uppgift</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id, task.completed)}
                        />
                        <span>{task.title}</span>
                        <button onClick={() => deleteTask(task.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
