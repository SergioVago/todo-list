import './App.module.css'

import styles from './App.module.css'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Task } from './components/Task'
import clipboardIcon from './assets/clipboardIcon.svg'

interface Task {
  isChecked: boolean
  isDeleted: boolean
  text: string
}

const initialTasks = [
  {
    isChecked: true,
    isDeleted: false,
    text: 'Fazer o modelo de task completa'
  },
  {
    isChecked: true,
    isDeleted: false,
    text: 'A Fazer o modelo de task completa'
  },
  {
    isChecked: true,
    isDeleted: true,
    text: 'Fazer o modelo de task removida'
  },
  {
    isChecked: false,
    isDeleted: false,
    text: 'A Fazer o modelo de task incompleta'
  },
  {
    isChecked: false,
    isDeleted: false,
    text: 'Fazer o modelo de task incompleta'
  },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTaskText, setNewTaskText] = useState('')

  function handleDeleteTask(text: string) {
    setTasks(state => state.map(task => {
      if (task.text === text) {
        return {
          ...task,
          isDeleted: !task.isDeleted,
        }
      }

      return task
    }))
  }

  function handleCheckTask(text: string) {
    setTasks(state => state.map(task => {
      if (task.text === text) {
        return {
          ...task,
          isChecked: !task.isChecked,
        }
      }

      return task
    }))
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function handleOnSubmitForm(event: FormEvent) {
    event.preventDefault()

    if (!newTaskText) {
      return
    }

    const newTask: Task = {
      text: newTaskText,
      isChecked: false,
      isDeleted: false,
    }

    setTasks(state => [newTask, ...state])

    setNewTaskText('')
  }

  const withoutDeletedTasks = tasks.filter(task => !task.isDeleted)
  const isEmpty = withoutDeletedTasks.length === 0
  const tasksCount = withoutDeletedTasks.length
  const completedCount = tasks.filter(task => task.isChecked).length

  const tasksSortedByUncompletedAndName = tasks.sort((a, b) =>
    Number(a.isChecked) - Number(b.isChecked))

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <form onSubmit={handleOnSubmitForm}>
          <div className={styles.newTask}>
            <Input
              placeholder="Adicione uma nova tarefa"
              name="text"
              value={newTaskText}
              onChange={handleNewTaskTextChange}
            />
            <button type="submit">Criar <PlusCircle size={32} /></button>
          </div>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div>
              Tarefas Criadas <span>{tasksCount}</span>
            </div>
            <div>
              Concluídas <span>{completedCount}</span>
            </div>
          </div>

          {isEmpty ? (
            <div className={`${styles.tasksList} ${styles.emptyTasksList}`}>
              <img src={clipboardIcon} />
              <p>
                <strong>
                  Você ainda não tem tarefas cadastradas
                </strong>
                <br />
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          ) : (
            <div className={styles.tasksList}>
              {tasksSortedByUncompletedAndName.map(task => {
                return (
                  <Task
                    key={task.text}
                    task={task}
                    onDeleteTask={handleDeleteTask}
                    onCheckTask={handleCheckTask}
                  />
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
