import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, TrendingUp, Target, SquareCheck as CheckSquare } from 'lucide-react-native';
import { useTasks } from '../../hooks/useTasks';
import { StatsCard } from '../../components/StatsCard';
import { QuickActions } from '../../components/QuickActions';
import { RecentTasks } from '../../components/RecentTasks';

export default function HomeScreen() {
  const { tasks, completedTasks } = useTasks();
  
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    return new Date(task.dueDate).toDateString() === today;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjour ! 👋</Text>
          <Text style={styles.subtitle}>Voici un aperçu de vos tâches</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatsCard
            icon={<Target color="#3B82F6" size={24} />}
            title="Total des tâches"
            value={tasks.length.toString()}
            subtitle="tâches créées"
            color="#3B82F6"
          />
          <StatsCard
            icon={<TrendingUp color="#10B981" size={24} />}
            title="Complétées"
            value={`${Math.round(completionRate)}%`}
            subtitle="taux de réussite"
            color="#10B981"
          />
        </View>

        <View style={styles.statsContainer}>
          <StatsCard
            icon={<Calendar color="#F97316" size={24} />}
            title="Aujourd'hui"
            value={todayTasks.length.toString()}
            subtitle="tâches du jour"
            color="#F97316"
          />
          <StatsCard
            icon={<CheckSquare color="#8B5CF6" size={24} />}
            title="En cours"
            value={(tasks.length - completedTasks.length).toString()}
            subtitle="à terminer"
            color="#8B5CF6"
          />
        </View>

        <QuickActions />
        <RecentTasks />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    // Remplace gap par marge droite sur le 1er élément
  },
  statsCardMargin: {
    marginRight: 12,
  }
});
