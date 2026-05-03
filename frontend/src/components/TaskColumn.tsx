import { TaskCard } from './TaskCard';

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

type TaskColumnProps = {
    title: string;
    tasks: Todo[];
    formatDueDate: (value: string | null) => string;
    handleUpdateTodo: (input: UpdateTodoInput) => Promise<void>;
    handleDeleteTodo: (id: number) => Promise<void>;
};

export function TaskColumn({
    title,
    tasks,
    formatDueDate,
    handleUpdateTodo,
    handleDeleteTodo,
}: TaskColumnProps) {
    return (
        <div className="column">
            <div className="column-header">
                <h2>{title}</h2>
                <span className="column-count">{tasks.length}</span>
            </div>

            <ul className="task-list">
                {tasks.map((todo) => (
                    <TaskCard
                        key={todo.id}
                        todo={todo}
                        formatDueDate={formatDueDate}
                        handleUpdateTodo={handleUpdateTodo}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}