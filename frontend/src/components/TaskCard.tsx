import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

type Todo = {
    id: number;
    title: string;
    description: string | null;
    status: string;
    dueDate: string | null;
};

type UpdateTodoInput = {
    id: number;
    title?: string;
    dueDate?: string;
    status?: string;
};

type TaskCardProps = {
    todo: Todo;
    formatDueDate: (value: string | null) => string;
    handleUpdateTodo: (input: UpdateTodoInput) => Promise<void>;
    handleDeleteTodo: (id: number) => Promise<void>;
};

export function TaskCard({
    todo,
    formatDueDate,
    handleUpdateTodo,
    handleDeleteTodo,
}: TaskCardProps) {
    const navigate = useNavigate();

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: todo.id.toString(),
    });

    const style = {
        opacity: isDragging ? 0.3 : 1,
    };

    const getStatusClassName = (status: string) => {
        switch (status) {
            case 'TODO':
                return 'task-status-select task-status-todo';
            case 'DOING':
                return 'task-status-select task-status-doing';
            case 'DONE':
                return 'task-status-select task-status-done';
            default:
                return 'task-status-select';
        }
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="task-card"
            {...listeners}
            {...attributes}
        >
            <div className="task-header">
                <span className="task-title">{todo.title}</span>

                <div className="task-icon-actions">
                    <button
                        className="task-icon-button task-icon-button-view"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/tasks/${todo.id}`);
                        }}
                        aria-label="View details"
                        title="Details"
                        type="button"
                    >
                        <Eye size={18} />
                    </button>

                    <button
                        className="task-icon-button task-icon-button-delete"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteTodo(todo.id);
                        }}
                        aria-label="Delete task"
                        title="Delete"
                        type="button"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {todo.description && (
                <div className="task-description">{todo.description}</div>
            )}

            <div className="task-footer">
                <div className="task-due">
                    {todo.dueDate ? formatDueDate(todo.dueDate) : 'No due date'}
                </div>

                <div className="task-actions">
                    <select
                        className={getStatusClassName(todo.status)}
                        value={todo.status}
                        onPointerDown={(event) => event.stopPropagation()}
                        onChange={(event) =>
                            handleUpdateTodo({
                                id: todo.id,
                                status: event.target.value,
                            })
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        <option value="TODO">TODO</option>
                        <option value="DOING">DOING</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>
            </div>
        </li>
    );
}