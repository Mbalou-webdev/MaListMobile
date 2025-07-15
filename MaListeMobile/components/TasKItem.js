import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <TouchableOpacity
      style={[styles.task, task.done && styles.done]}
      onPress={onToggle}
      onLongPress={onDelete}
    >
      <Text style={styles.taskText}>{task.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 15,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  done: {
    backgroundColor: '#a0aec0',
    textDecorationLine: 'line-through',
  },
});

export default TaskItem;
