import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { TaskColumn } from './components/TaskColumn';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { NewTaskPage } from './pages/NewTaskPage';
import './App.css';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      status
      dueDate
    }
  }`;

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
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

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id){
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

type GetTodosData = {
  todos: Todo[];
};

type CreateTodoData = {
  createTodo: Todo;
};

type CreateTodoVariables = {
  input: {
    title: string;
    description: string;
    dueDate?: string;
    status?: string;
  };
};

type UpdateTodoData = {
  updateTodo: Todo;
};

type UpdateTodoVariables = {
  input: {
    id: number;
    title?: string;
    dueDate?: string;
    status?: string;
  }
}

type DeleteTodoData = {
  deleteTodo: Todo;
}

type DeleteTodoVariables = {
  id: number;
}

function App() {
  const { loading, error, data } = useQuery<GetTodosData>(GET_TODOS);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [createTodo] = useMutation<CreateTodoData, CreateTodoVariables>(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation<UpdateTodoData, UpdateTodoVariables>(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation<DeleteTodoData, DeleteTodoVariables>(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [status, setStatus] = useState('TODO');
  const [editingDueDates, setEditingDueDates] = useState<Record<number, string>>({});

  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const handleCreateTodo = async () => {
    const isoDueDate = dueDate ? new Date(dueDate).toISOString() : undefined;
    if (!title.trim()) return;

    await createTodo({
      variables: {
        input: {
          title,
          description,
          dueDate: isoDueDate,
          status,
        },
      },
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('TODO');
  };

  const handleUpdateTodo = async (input: UpdateTodoVariables['input']) => {
    await updateTodo({
      variables: {
        input,
      }
    });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo({
      variables: { id },
    });
  }

  const formatDueDate = (value: string | null) => {
    if (!value) return 'No due date';
    return new Date(value).toLocaleString('ja-JP');
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredTodos =
  data?.todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  ) ?? [];
  const todoItems = filteredTodos.filter((todo) => todo.status === 'TODO');
  const doingItems = filteredTodos.filter((todo) => todo.status === 'DOING');
  const doneItems = filteredTodos.filter((todo) => todo.status === 'DONE');

  return(
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <div className="page-header">
            <h1>Todo List</h1>

            <div className="header-actions">
              <button
                className="new-task-button"
                onClick={() => navigate('/tasks/new')}
              >
                + New Task
              </button>

              <input
                className="search-input"
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search tasks..."
              />
            </div>
          </div>

            <div className="board">
              <TaskColumn
                title="TODO"
                tasks={todoItems}
                editingDueDates={editingDueDates}
                setEditingDueDates={setEditingDueDates}
                formatDueDate={formatDueDate}
                formatForDateTimeLocal={formatForDateTimeLocal}
                handleUpdateTodo={handleUpdateTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
              <TaskColumn
                title="DOING"
                tasks={doingItems}
                editingDueDates={editingDueDates}
                setEditingDueDates={setEditingDueDates}
                formatDueDate={formatDueDate}
                formatForDateTimeLocal={formatForDateTimeLocal}
                handleUpdateTodo={handleUpdateTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
              <TaskColumn
                title="DONE"
                tasks={doneItems}
                editingDueDates={editingDueDates}
                setEditingDueDates={setEditingDueDates}
                formatDueDate={formatDueDate}
                formatForDateTimeLocal={formatForDateTimeLocal}
                handleUpdateTodo={handleUpdateTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            </div>
          </div>
        }
      />
      <Route
        path="/tasks/new"
        element={
          <NewTaskPage
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            dueDate={dueDate}
            setDueDate={setDueDate}
            status={status}
            setStatus={setStatus}
            handleCreateTodo={handleCreateTodo}
          />
        }
      />
    </Routes>
  );
}

export default App;