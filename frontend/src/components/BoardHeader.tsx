type BoardHeaderProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    sortBy: 'dueDate' | 'title';
    setSortBy: React.Dispatch<React.SetStateAction<'dueDate' | 'title'>>;
    onNewTaskClick: () => void;
};

export function BoardHeader({
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    onNewTaskClick,
}: BoardHeaderProps) {
    return (
        <div className="page-header">
            <h1>Task Board</h1>

            <div className="header-actions">
                <input
                    className="search-input"
                    type="text"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search tasks..."
                />

                <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(event) =>
                        setSortBy(event.target.value as 'dueDate' | 'title')
                    }
                >
                    <option value="dueDate">Due Date</option>
                    <option value="title">Title</option>
                </select>

                <button
                    className="new-task-button"
                    onClick={onNewTaskClick}
                >
                    + New Task
                </button>
            </div>
        </div>
    );
}