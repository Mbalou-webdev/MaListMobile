import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Plus, Clock, Flag } from 'lucide-react-native';

export function QuickActions() {
  const actions = [
    { 
      icon: <Plus color="#3B82F6" size={20} />, 
      title: 'Nouvelle tâche', 
      color: '#3B82F6',
      onPress: () => {} 
    },
    { 
      icon: <Clock color="#F97316" size={20} />, 
      title: 'Urgente', 
      color: '#F97316',
      onPress: () => {} 
    },
    { 
      icon: <Flag color="#10B981" size={20} />, 
      title: 'Rappel', 
      color: '#10B981',
      onPress: () => {} 
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions rapides</Text>
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <Pressable 
            key={index}
            style={[styles.actionButton, { backgroundColor: `${action.color}15` }]}
            onPress={action.onPress}
          >
            <View style={styles.iconContainer}>
              {action.icon}
            </View>
            <Text style={[styles.actionText, { color: action.color }]}>
              {action.title}
            </Text>
          </Pressable>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  iconContainer: {
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});