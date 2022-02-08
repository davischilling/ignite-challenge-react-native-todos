import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { EditedTask, Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)
    if (taskWithSameTitle) {
      return Alert.alert('Task ja cadastrada', 'Voce nao pode cadastrar uma task com o mesmo nome')
    }

    //TODO - add new task
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que voce deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Nao'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          //TODO - remove task from state
          setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditedTask) {
    const taskWithSameTitle = tasks.find(task => task.title === taskNewTitle)
    if (taskWithSameTitle) {
      Alert.alert('Task ja cadastrada', 'Voce nao pode cadastrar uma task com o mesmo nome')
      return false
    } 
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId)
    if (!taskToBeUpdated)
      return false
    taskToBeUpdated.title = taskNewTitle
    setTasks(updatedTasks)
    return true
    //TODO - edit task from state
    // setTasks(oldState => oldState.map(task => {
    //   if (task.id === taskId) {
    //     task.title = taskNewTitle
    //   }
    //   return task
    // }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})