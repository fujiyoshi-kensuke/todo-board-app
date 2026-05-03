import { useNavigate } from 'react-router-dom';

type NewTaskPageProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
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
    description,
    setDescription,
}: NewTaskPageProps) {

    const navigate = useNavigate();
    const handleSubmit = async () => {
        await handleCreateTodo();
        navigate('/');
    };

    return (
        <div className="app">
            <div className="new-task-topbar">
                <button
                    className="new-task-back"
                    onClick={() => navigate('/')}
                >
                    Back to Board
                </button>
            </div>

            <div className="new-task-page">
                <div className="new-task-card">
                    <h1>Create New Task</h1>

                    <div className="new-task-field">
                        <label className="new-task-label">Title</label>
                        <input
                            className="new-task-input"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Enter task title"
                        />
                    </div>

                    <div className="new-task-field">
                        <label className="new-task-label">Description</label>
                        <textarea
                            className="new-task-textarea"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Enter task description"
                        />
                    </div>

                    <div className="new-task-row">
                        <div className="new-task-field">
                            <label className="new-task-label">Status</label>
                            <select
                                className="new-task-input"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="TODO">TODO</option>
                                <option value="DOING">DOING</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <div className="new-task-field">
                            <label className="new-task-label">Due Date</label>
                            <input
                                className="new-task-input"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="new-task-actions">
                        <button
                            className="new-task-primary"
                            onClick={handleSubmit}
                        >
                            Create Task
                        </button>
                        <button
                            className="new-task-secondary"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}