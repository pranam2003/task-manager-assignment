import { useState, useRef, useEffect } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSubmit = () => {
        if (editTitle.trim() !== '' && editTitle !== task.title) {
            onEdit(task.id, editTitle);
        } else {
            setEditTitle(task.title); // reset on empty
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        } else if (e.key === 'Escape') {
            setEditTitle(task.title);
            setIsEditing(false);
        }
    };

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <label className="task-checkbox-container">
                    <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id, task.completed)}
                    />
                </label>

                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="task-input"
                        style={{ padding: '0.25rem 0.5rem', marginBottom: 0 }}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span
                        className="task-title"
                        onDoubleClick={() => setIsEditing(true)}
                        title="Double-click to edit"
                    >
                        {task.title}
                    </span>
                )}
            </div>

            <div className="task-actions">
                {!isEditing && (
                    <button
                        className="btn-icon"
                        onClick={() => setIsEditing(true)}
                        title="Edit task"
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                )}
                <button
                    className="btn-icon danger"
                    onClick={() => onDelete(task.id)}
                    title="Delete task"
                >
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
