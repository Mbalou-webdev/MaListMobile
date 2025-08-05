import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, CircleCheck as CheckCircle } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterModal({ visible, onClose, selectedFilter, onFilterChange }: FilterModalProps) {
  const filters = [
    { value: 'all', label: 'Toutes les tâches' },
    { value: 'pending', label: 'En cours' },
    { value: 'completed', label: 'Terminées' },
    { value: 'high', label: 'Priorité haute' },
    { value: 'medium', label: 'Priorité moyenne' },
    { value: 'low', label: 'Priorité basse' },
  ];

  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filtrer les tâches</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X color="#6B7280" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          {filters.map((filter) => (
            <Pressable
              key={filter.value}
              style={styles.filterItem}
              onPress={() => handleFilterSelect(filter.value)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.value && styles.filterTextSelected
              ]}>
                {filter.label}
              </Text>
              {selectedFilter === filter.value && (
                <CheckCircle color="#3B82F6" size={20} />
              )}
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
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
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  filterTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});