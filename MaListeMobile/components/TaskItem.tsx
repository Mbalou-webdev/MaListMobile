// components/TaskItem.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { Check, MoveVertical as MoreVertical, CreditCard as Edit, Trash2, Calendar } from 'lucide-react-native';
import { Task } from '../hooks/useTasks';
import { EditTaskModal } from '../components/EditTasKModal';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (task: Partial<Task>) => void;
  compact?: boolean;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate, compact = false }: TaskItemProps) {
  const [showActions, setShowActions] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.98, {}, () => {
      scale.value = withSpring(1);
    });
    onToggle();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F97316';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <View style={[styles.container, compact && styles.compactContainer]}>
        <Pressable style={styles.checkboxContainer} onPress={handlePress}>
          <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
            {task.completed && <Check color="#FFFFFF" size={16} />}
          </View>
        </Pressable>

        <View style={styles.content}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]}>
            {task.title}
          </Text>

          {task.description && !compact && (
            <Text style={[styles.description, task.completed && styles.descriptionCompleted]}>
              {task.description}
            </Text>
          )}

          <View style={styles.metadata}>
            <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(task.priority)}15` }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {getPriorityLabel(task.priority)}
              </Text>
            </View>

            <View style={styles.dateContainer}>
              <Calendar color="#6B7280" size={12} />
              <Text style={styles.dateText}>{formatDate(task.dueDate)}</Text>
            </View>
          </View>
        </View>

        {!compact && (
          <Pressable style={styles.actionsButton} onPress={() => setShowActions(!showActions)}>
            <MoreVertical color="#6B7280" size={20} />
          </Pressable>
        )}

        {showActions && (
          <View style={styles.actionsMenu}>
            <Pressable
              style={styles.actionItem}
              onPress={() => {
                setIsEditModalVisible(true);
                setShowActions(false);
              }}
            >
              <Edit color="#3B82F6" size={16} />
              <Text style={styles.actionText}>Modifier</Text>
            </Pressable>
            <Pressable
              style={styles.actionItem}
              onPress={() => {
                onDelete();
                setShowActions(false);
              }}
            >
              <Trash2 color="#EF4444" size={16} />
              <Text style={[styles.actionText, { color: '#EF4444' }]}>Supprimer</Text>
            </Pressable>
          </View>
        )}
      </View>

      <EditTaskModal
        visible={isEditModalVisible}
        task={task}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateTask={onUpdate}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  compactContainer: { padding: 12 },
  checkboxContainer: { paddingTop: 2 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  content: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 20,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  descriptionCompleted: {
    color: '#9CA3AF',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionsButton: { padding: 4 },
  actionsMenu: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    minWidth: 120,
  },
  actionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});
