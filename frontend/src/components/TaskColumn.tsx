import { useDroppable } from '@dnd-kit/core';
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
    status: 'TODO' | 'DOING' | 'DONE';
    tasks: Todo[];
    formatDueDate: (value: string | null) => string;
    handleUpdateTodo: (input: UpdateTodoInput) => Promise<void>;
    handleDeleteTodo: (id: number) => Promise<void>;
};

export function TaskColumn({
    title,
    status,
    tasks,
    formatDueDate,
    handleUpdateTodo,
    handleDeleteTodo,
}: TaskColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    return (
        <div
            ref={setNodeRef}
            className={`column ${isOver ? 'column-drag-over' : ''}`}
        >
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