import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, Award, Target } from 'lucide-react-native';

interface ProfileHeaderProps {
  completionRate: number;
  totalTasks: number;
  activeTasks: number;
}

export function ProfileHeader({ completionRate, totalTasks, activeTasks }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <User color="#FFFFFF" size={32} />
        </View>
      </View>
      
      <Text style={styles.name}>Utilisateur</Text>
      <Text style={styles.email}>utilisateur@example.com</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Target color="#3B82F6" size={20} />
          <Text style={styles.statValue}>{totalTasks}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={styles.statItem}>
          <Award color="#10B981" size={20} />
          <Text style={styles.statValue}>{Math.round(completionRate)}%</Text>
          <Text style={styles.statLabel}>Réussite</Text>
        </View>
        
        <View style={styles.statItem}>
          <Target color="#F97316" size={20} />
          <Text style={styles.statValue}>{activeTasks}</Text>
          <Text style={styles.statLabel}>En cours</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});