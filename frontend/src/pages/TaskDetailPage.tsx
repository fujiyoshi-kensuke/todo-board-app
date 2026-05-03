import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useParams, useNavigate } from 'react-router-dom';

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

export function TaskDetailPage() {
    const { id } = useParams();
    const todoId = Number(id);
    const navigate = useNavigate();

    const { loading, error, data } = useQuery<GetTodoData, GetTodoVariables>(GET_TODO, {
        variables: { id: todoId },
    });

    const formatDueDate = (value: string | null) => {
        if (!value) return 'No due date';
        return new Date(value).toLocaleString('ja-JP');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
    <div className="app">
        <div className="detail-page">
        <div className="detail-actions">
            <button onClick={() => navigate('/')}>Back to Board</button>
            <button onClick={() => navigate(`/tasks/${todoId}/edit`)}>
            Edit
            </button>
        </div>

        <h1 className="detail-title">{data?.todo.title}</h1>

        <div className="detail-meta">
            <p><strong>ID:</strong> {data?.todo.id}</p>
            <p><strong>Status:</strong> {data?.todo.status}</p>
            <p><strong>Due:</strong> {formatDueDate(data?.todo.dueDate ?? null)}</p>
        </div>

        <div className="detail-section">
            <h2>Description</h2>
            <p className="detail-description">
            {data?.todo.description ?? 'No description'}
            </p>
        </div>
        </div>
    </div>
    );
}