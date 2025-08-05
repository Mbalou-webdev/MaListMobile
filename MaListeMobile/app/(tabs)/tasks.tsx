import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Filter } from 'lucide-react-native';
import { useTasks } from '../../hooks/useTasks';
import { TaskItem } from '../../components/TaskItem';
import { AddTaskModal } from '../../components/AddTaKModal';
import { SearchHeader } from '../../components/SearchHeader';
import { FilterModal } from '../../components/FilterModal';

export default function TasksScreen() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      (selectedFilter === 'completed' && task.completed) ||
      (selectedFilter === 'pending' && !task.completed) ||
      (selectedFilter === task.priority);

    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Tâches</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Filter color="#6B7280" size={20} />
          </Pressable>
          <Pressable 
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Plus color="#FFFFFF" size={20} />
          </Pressable>
        </View>
      </View>

      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Aucune tâche trouvée</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || selectedFilter !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par créer votre première tâche'}
            </Text>
          </View>
        ) : (
          <View style={styles.taskContainer}>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
                onUpdate={(updatedTask) => updateTask(task.id, updatedTask)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddTask={addTask}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskList: {
    flex: 1,
  },
  taskContainer: {
    padding: 20,
    gap: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});