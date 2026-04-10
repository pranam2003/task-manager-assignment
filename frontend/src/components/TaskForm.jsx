import { useState } from 'react';

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            setIsSubmitting(true);
            await onAdd(title.trim());
            setTitle(''); // Clear form on success
        } catch (err) {
            // Error handled by parent toast, but we keep the title here so user can retry
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="task-input"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                autoFocus
            />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={!title.trim() || isSubmitting}
            >
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
}

export default TaskForm;
