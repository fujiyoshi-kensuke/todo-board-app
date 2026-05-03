import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const GET_TODO = gql`
    query GetTodo($id: Int!) {
        todo(id: $id) {
        id
        title
        description
        status
        dueDate
        }
    }
`;

const UPDATE_TODO = gql`
    mutation UpdateTodo($input: UpdateTodoInput!) {
        updateTodo(input: $input) {
        id
        title
        description
        status
        dueDate
        }
    }
`;

type Todo = {
    id: number;
    title: string;
    description: string | null;
    status: string;
    dueDate: string | null;
};

type GetTodoData = {
    todo: Todo;
};

type GetTodoVariables = {
    id: number;
};

type UpdateTodoData = {
    updateTodo: Todo;
};

type UpdateTodoVariables = {
    input: {
        id: number;
        title?: string;
        description?: string;
        dueDate?: string;
        status?: string;
    };
};

export function TaskEditPage() {
    const { id } = useParams();
    const todoId = Number(id);

    const { loading, error, data } = useQuery<GetTodoData, GetTodoVariables>(GET_TODO, {
        variables: { id: todoId },
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('TODO');
    const [dueDate, setDueDate] = useState('');
    const formatForDateTimeLocal = (value: string | null) => {
        if (!value) return '';

        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const navigate = useNavigate();
    const [updateTodo] = useMutation<UpdateTodoData, UpdateTodoVariables>(UPDATE_TODO);
    useEffect(() => {
        if (!data?.todo) return;
        setTitle(data.todo.title);
        setDescription(data.todo.description ?? '');
        setStatus(data.todo.status);
        setDueDate(formatForDateTimeLocal(data.todo.dueDate));
    }, [data]);

    const handleSave = async () => {
        const isoDueDate = dueDate ? new Date(dueDate).toISOString() : undefined;
        await updateTodo({
            variables: {
                input: {
                    id: todoId,
                    title,
                    description,
                    status,
                    dueDate: isoDueDate,
                },
            },
        });
        navigate(`/tasks/${todoId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="app">
            <div className="edit-task-topbar">
                <button
                    className="edit-task-back"
                    onClick={() => navigate(`/tasks/${todoId}`)}
                >
                    Back to Details
                </button>
            </div>

            <div className="edit-task-page">
                <div className="edit-task-card">
                    <h1>Edit Task</h1>

                    <div className="edit-task-field">
                        <label className="edit-task-label">Title</label>
                        <input
                            className="edit-task-input"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <div className="edit-task-field">
                        <label className="edit-task-label">Description</label>
                        <textarea
                            className="edit-task-textarea"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <div className="edit-task-row">
                        <div className="edit-task-field">
                            <label className="edit-task-label">Status</label>
                            <select
                                className="edit-task-input"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="TODO">TODO</option>
                                <option value="DOING">DOING</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <div className="edit-task-field">
                            <label className="edit-task-label">Due Date</label>
                            <input
                                className="edit-task-input"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="edit-task-actions">
                        <button
                            className="edit-task-primary"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                        <button
                            className="edit-task-secondary"
                            onClick={() => navigate(`/tasks/${todoId}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}