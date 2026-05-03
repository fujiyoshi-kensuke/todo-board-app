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
    editingDueDates: Record<number, string>;
    setEditingDueDates: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    formatDueDate: (value: string | null) => string;
    formatForDateTimeLocal: (value: string | null) => string;
    handleUpdateTodo: (input: UpdateTodoInput) => Promise<void>;
    handleDeleteTodo: (id: number) => Promise<void>;
};

export function TaskCard({
    todo,
    editingDueDates,
    setEditingDueDates,
    formatDueDate,
    formatForDateTimeLocal,
    handleUpdateTodo,
    handleDeleteTodo,
}: TaskCardProps) {
    return (
        <li className="task-card">
        <div className="task-header">
            <span className="task-title">{todo.title}</span>
            <span className="task-status">{todo.status}</span>
        </div>

        <div className="task-due">
            {todo.dueDate ? `Due: ${formatDueDate(todo.dueDate)}` : 'No due date'}
        </div>

        {todo.description && (
            <div className="task-description">{todo.description}</div>
        )}

        <div className="task-due-editor">
            <input
            type="datetime-local"
            value={editingDueDates[todo.id] ?? formatForDateTimeLocal(todo.dueDate)}
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
        </div>

        <div className="task-actions">
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

            <button onClick={() => handleDeleteTodo(todo.id)}>
            Delete
            </button>
        </div>
        </li>
    );
}