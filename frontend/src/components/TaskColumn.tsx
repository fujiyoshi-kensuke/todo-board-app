import { TaskCard } from './TaskCard';

type Todo = {
    id: number;
    title: string;
    status: string;
    dueDate: string | null;
};

type UpdateTodoInput = {
    id: number;
    title?: string;
    dueDate?: string;
    status?: string;
};

type TaskColumnProps = {
    title: string;
    tasks: Todo[];
    editingDueDates: Record<number, string>;
    setEditingDueDates: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    formatDueDate: (value: string | null) => string;
    formatForDateTimeLocal: (value: string | null) => string;
    handleUpdateTodo: (input: UpdateTodoInput) => Promise<void>;
    handleDeleteTodo: (id: number) => Promise<void>;
};

export function TaskColumn({
    title,
    tasks,
    editingDueDates,
    setEditingDueDates,
    formatDueDate,
    formatForDateTimeLocal,
    handleUpdateTodo,
    handleDeleteTodo,
}: TaskColumnProps) {
    return (
        <div className="column">
        <h2>{title}</h2>
        <ul className="task-list">
            {tasks.map((todo) => (
            <TaskCard
                key={todo.id}
                todo={todo}
                editingDueDates={editingDueDates}
                setEditingDueDates={setEditingDueDates}
                formatDueDate={formatDueDate}
                formatForDateTimeLocal={formatForDateTimeLocal}
                handleUpdateTodo={handleUpdateTodo}
                handleDeleteTodo={handleDeleteTodo}
            />
            ))}
        </ul>
        </div>
    );
}