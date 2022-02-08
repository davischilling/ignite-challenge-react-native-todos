import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/images/edit/editIcon.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
  }
  
  export type EditedTask = {
    taskId: number
    taskNewTitle: string
  }

interface TaskItemProps {
    task: Task
    index: number
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void
    editTask: ({ taskId, taskNewTitle }: EditedTask) => boolean
  }

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [taskEditedTitle, setTaskEditedTitle] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsBeingEdited(true)
    }

    function handleCancelEditing() {
        setIsBeingEdited(false)
        setTaskEditedTitle(task.title)
    }

    function handleSubmitEditing() {
        const result = editTask({ taskId: task.id, taskNewTitle: taskEditedTitle })
        !result ? setTaskEditedTitle(task.title) : null
        setIsBeingEdited(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isBeingEdited) {
              textInputRef.current.focus();
            } else {
              textInputRef.current.blur();
            }
        }
    }, [isBeingEdited])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(task.id)}
                    disabled={isBeingEdited}
                >
                    <View 
                        testID={`marker-${index}`}
                        //TODO - use style prop
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        { task.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    {/* //TODO - use style prop - main challenge
                    <Text
                        style={item.done ? styles.taskTextDone : styles.taskText}
                    >
                        {item.title}
                    </Text> */}

                    {/* //TODO - add new props - additional challenge */}
                    <TextInput
                        ref={textInputRef}
                        value={taskEditedTitle}
                        onChangeText={setTaskEditedTitle}
                        editable={isBeingEdited}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {
                    isBeingEdited ? (
                        <TouchableOpacity onPress={handleCancelEditing}>
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleStartEditing}>
                            <Image source={editIcon} />
                        </TouchableOpacity>
                    )
                }

                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    //TODO - use onPress (remove task) prop
                    onPress={() => removeTask(task.id)}
                    disabled={isBeingEdited}
                >
                    <Image source={trashIcon} style={{ opacity: isBeingEdited ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        width: 2,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12
    },
  })