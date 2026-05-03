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
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate(`/tasks/${todoId}/edit`)}>
            Edit
            </button>

            <h1>Task Detail</h1>
            <p>ID: {data?.todo.id}</p>
            <p>Title: {data?.todo.title}</p>
            <p>Status: {data?.todo.status}</p>
            <p>Description: {data?.todo.description ?? 'No description'}</p>
            <p>Due: {formatDueDate(data?.todo.dueDate ?? null)}</p>
        </div>
    );
}