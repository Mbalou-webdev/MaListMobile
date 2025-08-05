// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router/tabs';
import { Chrome as Home, SquareCheck as CheckSquare, User } from 'lucide-react-native';
import { TextStyle } from 'react-native';

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#3B82F6',
  tabBarInactiveTintColor: '#6B7280',
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600' as TextStyle['fontWeight'], // Cast pour corriger TS
    marginTop: 4,
  },
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tâches',
          tabBarIcon: ({ size, color }) => <CheckSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
