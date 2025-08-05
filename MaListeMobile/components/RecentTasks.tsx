import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTasks } from '../hooks/useTasks';
import { TaskItem } from '../components/TaskItem';

export function RecentTasks() {
  const { tasks, toggleTask, deleteTask, updateTask } = useTasks();
  
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (recentTasks.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tâches récentes</Text>
        <Pressable style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Voir tout</Text>
          <ChevronRight color="#3B82F6" size={16} />
        </Pressable>
      </View>
      
      <View style={styles.tasksContainer}>
        {recentTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
            onUpdate={(updatedTask) => updateTask(task.id, updatedTask)}
            compact
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  tasksContainer: {
    gap: 8,
  },
});