import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      status
      dueDate
    }
  }`;

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
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
      status
      dueDate
    }
  }
`;

type Todo = {
  id: number;
  title: string;
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

  const handleCreateTodo = async () => {
    const isoDueDate = dueDate ? new Date(dueDate).toISOString() : undefined;
    if (!title.trim()) return;

    await createTodo({
      variables: {
        input: {
          title,
          dueDate: isoDueDate,
          status,
        },
      },
    });
    setTitle('');
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

  return(
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New todo title"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="TODO">TODO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.status}
            {todo.dueDate ? ` - Due: ${formatDueDate(todo.dueDate)}` : ' - No due date'}
            <input
              type="datetime-local"
              value={editingDueDates[todo.id]??formatForDateTimeLocal(todo.dueDate)}
              onChange={(event) =>
                setEditingDueDates({
                  ...editingDueDates,
                  [todo.id]: event.target.value,
                })
              }
            />
            <button
              onClick={() => {
                const localValue = editingDueDates[todo.id];
                const isoDueDate = localValue ? new Date(localValue).toISOString() : undefined;

                handleUpdateTodo({
                  id: todo.id,
                  dueDate: isoDueDate,
                });
              }}
            >
              Update Due Date
            </button>
            <select
              value={todo.status}
              onChange={(event) =>
                handleUpdateTodo({
                  id: todo.id,
                  status: event.target.value,
                })
              }
            >
              <option value="TODO">TODO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;