import { useNavigate } from 'react-router-dom';

type NewTaskPageProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    dueDate: string;
    setDueDate: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    handleCreateTodo: () => Promise<void>;
}

export function NewTaskPage({
    title,
    setTitle,
    dueDate,
    setDueDate,
    status,
    setStatus,
    handleCreateTodo,
}: NewTaskPageProps) {

    const navigate = useNavigate();
    const handleSubmit = async () => {
        await handleCreateTodo();
        navigate('/');
    };
    return (
        <div className="app">
            <h1>New Task</h1>
            <div className="create-form">
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="New todo title"
                />
                <input
                    type="datetime-local"
                    value={ dueDate }
                    onChange={(event) => setDueDate(event.target.value)}
                />
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="TODO">TODO</option>
                    <option value="DOING">DOING</option>
                    <option value="DONE">DONE</option>
                </select>
                <button onClick={handleSubmit}>Add Todo</button>
            </div>
        </div>
    );
}