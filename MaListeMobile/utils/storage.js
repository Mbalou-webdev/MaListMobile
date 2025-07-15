import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTasks = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Erreur chargement', error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Erreur sauvegarde', error);
  }
};
