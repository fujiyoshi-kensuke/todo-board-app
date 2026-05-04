import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { TaskColumn } from './components/TaskColumn';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BoardHeader } from './components/BoardHeader';
import { NewTaskPage } from './pages/NewTaskPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { TaskEditPage } from './pages/TaskEditPage';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
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

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'title'>('dueDate');
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTodoId(null);

    if (!over) return;

    const targetStatus = over.id.toString();

    if (
      targetStatus !== 'TODO' &&
      targetStatus !== 'DOING' &&
      targetStatus !== 'DONE'
    ) {
      return;
    }

    const draggedTodo = data?.todos.find(
      (todo) => todo.id.toString() === active.id.toString()
    );

    if (!draggedTodo) return;
    if (draggedTodo.status === targetStatus) return;

    await handleUpdateTodo({
      id: draggedTodo.id,
      status: targetStatus,
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTodoId(Number(event.active.id));
  };

  const formatDueDate = (value: string | null) => {
    if (!value) return 'No due date';
    return new Date(value).toLocaleString('ja-JP');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredTodos =
  data?.todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
    (todo.description ?? '').toLowerCase().includes(searchText.toLowerCase())
  ) ?? [];
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'dueDate') {
      const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    }
    return a.title.localeCompare(b.title);
  });
  const activeTodo =
    activeTodoId === null
      ? null
      : data?.todos.find((todo) => todo.id === activeTodoId) ?? null;
  const todoItems = sortedTodos.filter((todo) => todo.status === 'TODO');
  const doingItems = sortedTodos.filter((todo) => todo.status === 'DOING');
  const doneItems = sortedTodos.filter((todo) => todo.status === 'DONE');

  return(
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <BoardHeader
              searchText={searchText}
              setSearchText={setSearchText}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onNewTaskClick={() => navigate('/tasks/new')}
            />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className="board">
                <TaskColumn
                  title="TODO"
                  status="TODO"
                  tasks={todoItems}
                  formatDueDate={formatDueDate}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
                <TaskColumn
                  title="DOING"
                  status="DOING"
                  tasks={doingItems}
                  formatDueDate={formatDueDate}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
                <TaskColumn
                  title="DONE"
                  status="DONE"
                  tasks={doneItems}
                  formatDueDate={formatDueDate}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              </div>

              <DragOverlay>
                {activeTodo ? (
                  <div className="task-card task-card-overlay">
                    <div className="task-header">
                      <span className="task-title">{activeTodo.title}</span>
                    </div>

                    {activeTodo.description && (
                      <div className="task-description">{activeTodo.description}</div>
                    )}

                    <div className="task-footer">
                      <div className="task-due">
                        {activeTodo.dueDate ? formatDueDate(activeTodo.dueDate) : 'No due date'}
                      </div>

                      <div className="task-actions">
                        <span className="task-status-overlay">{activeTodo.status}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
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
      <Route
        path="/tasks/:id"
        element={<TaskDetailPage />}
      />
      <Route
        path="/tasks/:id/edit"
        element={<TaskEditPage />}
      />
    </Routes>
  );
}

export default App;