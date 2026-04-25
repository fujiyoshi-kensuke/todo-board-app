import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }`;

const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id){
      id
      title
      completed
    }
  }
`;

type Todo = {
  id: number;
  title: string;
  completed: boolean;
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
  };
};

type UpdateTodoData = {
  updateTodo: Todo;
};

type UpdateTodoVariables = {
  input: {
    id: number;
    title?: string;
    completed?: boolean;
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
  const [createTodo] = useMutation<CreateTodoData, CreateTodoVariables>(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation<UpdateTodoData, UpdateTodoVariables>(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation<DeleteTodoData, DeleteTodoVariables>(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleCreateTodo = async () => {
    if (!title.trim()) return;

    await createTodo({
      variables: {
        input: { title },
      },
    });
    setTitle('');
  };

  const handleUpdateTodo = async (todo: Todo) => {
    await updateTodo({
      variables: {
        input: {
          id: todo.id,
          completed: !todo.completed,
        }
      }
    });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo({
      variables: { id },
    });
  }

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
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Done' : 'Not done'}
            <button
              onClick={() => handleUpdateTodo(todo)}
            >
              Toggle Completed
            </button>
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