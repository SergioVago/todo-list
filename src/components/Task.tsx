import { CheckCircle, Circle, Trash } from 'phosphor-react'
import { useState } from 'react'
import styles from './Task.module.css'

interface Task {
  isChecked: boolean
  isDeleted: boolean
  text: string
}

interface TaskProps {
  task: Task
  onDeleteTask: (text: string) => void
  onCheckTask: (text: string) => void
}

export function Task({ task, onDeleteTask, onCheckTask }: TaskProps) {
  const [isDeleted, setIsDeleted] = useState(task.isDeleted)
  const [isHidden, setIsHidden] = useState(task.isDeleted)

  async function handleDeleteTask() {
    setIsDeleted(true)

    onDeleteTask(task.text)
  }

  function handleCheckTask() {
    onCheckTask(task.text)
  }

  return (
    <div className={`${styles.taskContainer} ${isDeleted ? styles.isDeleted : ''} ${isHidden ? styles.isHidden : ''}`}
      onTransitionEnd={() => isDeleted && setIsHidden(true)}
    >
      <button
        type="button"
        className={task.isChecked ? styles.checkedButton : styles.uncheckedButton}
        onClick={handleCheckTask}
      >
        {task.isChecked ? (
          <CheckCircle size={18} />
        ) : (
          <Circle size={18} />
        )}
      </button>
      <p className={task.isChecked ? styles.completedTask : ''}>{task.text}</p>
      <button
        type="button"
        className={styles.trashButton}
        onClick={handleDeleteTask}
      >
        <Trash size={14} />
      </button>
    </div>
  )
}