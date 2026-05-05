import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { graphql } from '../gql';

const GET_TODO = graphql(`
  query GetTodo($id: Int!) {
    todo(id: $id) {
      id
      title
      description
      status
      dueDate
    }
  }
`);

const UPDATE_TODO = graphql(`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      title
      description
      status
      dueDate
    }
  }
`);

export function TaskEditPage() {
  const { id } = useParams();
  const todoId = Number(id);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TODO, {
    variables: { id: todoId },
  });

  const [updateTodo] = useMutation(UPDATE_TODO);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!data?.todo) return;

    setTitle(data.todo.title ?? '');
    setDescription(data.todo.description ?? '');
    setStatus(data.todo.status ?? 'TODO');

    if (data.todo.dueDate) {
      const date = new Date(data.todo.dueDate);
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDueDate(local);
    } else {
      setDueDate('');
    }
  }, [data]);

  const handleSave = async () => {
    await updateTodo({
      variables: {
        input: {
          id: todoId,
          title,
          description,
          status,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        },
      },
      refetchQueries: [{ query: GET_TODO, variables: { id: todoId } }],
    });

    navigate(`/tasks/${todoId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="app">
      <div className="edit-task-topbar">
        <div className="topbar-inner topbar-inner-narrow">
          <button
            className="edit-task-back"
            onClick={() => navigate(`/tasks/${todoId}`)}
          >
            <ArrowLeft size={16} className="back-icon" />
            <span>Back to Details</span>
          </button>
        </div>
      </div>

      <div className="edit-task-page">
        <div className="edit-task-card">
          <h1>Edit Task</h1>

          <div className="edit-task-field">
            <label className="edit-task-label">Title</label>
            <input
              className="edit-task-input"
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