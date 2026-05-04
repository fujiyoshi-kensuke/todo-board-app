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
        return new Date(value).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusClassName = (status: string) => {
        switch (status) {
            case 'TODO':
                return 'detail-status-badge detail-status-todo';
            case 'DOING':
                return 'detail-status-badge detail-status-doing';
            case 'DONE':
                return 'detail-status-badge detail-status-done';
            default:
                return 'detail-status-badge';
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="app">
            <div className="detail-topbar">
                <button
                    className="detail-back"
                    onClick={() => navigate('/')}
                >
                    Back to Board
                </button>

                <button
                    className="detail-edit-button primary"
                    onClick={() => navigate(`/tasks/${todoId}/edit`)}
                >
                    Edit
                </button>
            </div>

            <div className="detail-page">
                <div className="detail-card">
                    <h1 className="detail-title">{data?.todo.title}</h1>

                    <div className="detail-meta-inline">
                        <span className="detail-meta-text">Status:</span>
                        <span className={getStatusClassName(data?.todo.status ?? '')}>
                            {data?.todo.status}
                        </span>

                        <span className="detail-meta-separator">•</span>

                        <span className="detail-meta-text">
                            Due: {formatDueDate(data?.todo.dueDate ?? null)}
                        </span>
                    </div>

                    <hr className="detail-divider" />

                    <div className="detail-section">
                        <h2>Description</h2>
                        <p className="detail-description">
                            {data?.todo.description ?? 'No description'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}