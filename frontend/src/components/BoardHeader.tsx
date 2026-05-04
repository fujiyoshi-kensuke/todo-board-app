import { Search, ArrowUpDown } from 'lucide-react';

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
            <h1 className="board-title">Task Board</h1>

            <div className="header-actions">
                <div className="search-input-wrapper">
                    <Search className="search-input-icon" size={18} />
                    <input
                        className="search-input"
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Search tasks..."
                    />
                </div>

                <div className="sort-select-wrapper">
                    <ArrowUpDown className="sort-select-icon" size={18} />
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
                </div>

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