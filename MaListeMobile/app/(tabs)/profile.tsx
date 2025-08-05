import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Bell, CircleHelp as HelpCircle, Shield, LogOut } from 'lucide-react-native';
import { useTasks } from '../../hooks/useTasks';
import { ProfileHeader } from '../../components/ProfileHeader';
import { SettingsItem } from '../../components/SettingsItem';

export default function ProfileScreen() {
  const { tasks, completedTasks } = useTasks();
  
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
  const activeTasks = tasks.length - completedTasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileHeader 
          completionRate={completionRate}
          totalTasks={tasks.length}
          activeTasks={activeTasks}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.settingsContainer}>
            <SettingsItem
              icon={<Bell color="#6B7280" size={20} />}
              title="Notifications"
              subtitle="Gérer les rappels et alertes"
              onPress={() => {}}
            />
            <SettingsItem
              icon={<Settings color="#6B7280" size={20} />}
              title="Préférences"
              subtitle="Personnaliser l'application"
              onPress={() => {}}
            />
            <SettingsItem
              icon={<Shield color="#6B7280" size={20} />}
              title="Confidentialité"
              subtitle="Sécurité et données"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsContainer}>
            <SettingsItem
              icon={<HelpCircle color="#6B7280" size={20} />}
              title="Aide et Support"
              subtitle="FAQ et assistance"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Pressable style={styles.logoutButton}>
            <LogOut color="#EF4444" size={20} />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </Pressable>
        </View>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});