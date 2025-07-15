import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const TASKS_KEY = "@tasks_list";

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error("Erreur de sauvegarde :", error);
    }
  };

  const handleAddOrEditTask = () => {
    if (task.trim() === "") {
      Alert.alert("Erreur", "Veuillez entrer une tâche.");
      return;
    }

    if (isEditing) {
      const updatedTasks = tasks.map((item) =>
        item.id === currentTaskId ? { ...item, text: task } : item
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      const newTask = { id: Date.now().toString(), text: task };
      const newTasksList = [...tasks, newTask];
      setTasks(newTasksList);
      saveTasks(newTasksList);
    }

    setTask("");
  };

  const deleteTask = (id) => {
    Alert.alert("Confirmer", "Supprimer cette tâche ?", [
      { text: "Annuler" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          const updatedTasks = tasks.filter((item) => item.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const editTask = (id, text) => {
    setTask(text);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 MaListe Mobile</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écris ta tâche ici..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddOrEditTask}
        >
          <AntDesign name={isEditing ? "edit" : "plus"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>

            <View style={styles.icons}>
              <TouchableOpacity onPress={() => editTask(item.id, item.text)}>
                <Feather name="edit" size={20} color="#4caf50" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Feather name="trash-2" size={20} color="#f44336" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
