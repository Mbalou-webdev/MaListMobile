// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AntDesign, Feather } from "@expo/vector-icons";

// export default function App() {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   useEffect(() => {
//     saveTasks();
//   }, [tasks]);

//   const loadTasks = async () => {
//     try {
//       const storedTasks = await AsyncStorage.getItem("tasks");
//       if (storedTasks) {
//         setTasks(JSON.parse(storedTasks));
//       }
//     } catch (error) {
//       Alert.alert("Erreur", "Impossible de charger les tâches.");
//     }
//   };

//   const saveTasks = async () => {
//     try {
//       await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
//     } catch (error) {
//       Alert.alert("Erreur", "Impossible d'enregistrer les tâches.");
//     }
//   };

//   const addTask = () => {
//     if (!task.trim()) return;

//     if (editingTaskId !== null) {
//       const updatedTasks = tasks.map((t) =>
//         t.id === editingTaskId ? { ...t, text: task } : t
//       );
//       setTasks(updatedTasks);
//       setEditingTaskId(null);
//     } else {
//       const newTask = {
//         id: Date.now().toString(),
//         text: task,
//         done: false,
//       };
//       setTasks([...tasks, newTask]);
//     }

//     setTask("");
//   };

//   const deleteTask = (id) => {
//     Alert.alert("Supprimer", "Voulez-vous supprimer cette tâche ?", [
//       { text: "Annuler" },
//       {
//         text: "Supprimer",
//         onPress: () => setTasks(tasks.filter((t) => t.id !== id)),
//         style: "destructive",
//       },
//     ]);
//   };

//   const toggleDone = (id) => {
//     const updatedTasks = tasks.map((t) =>
//       t.id === id ? { ...t, done: !t.done } : t
//     );
//     setTasks(updatedTasks);
//   };

//   const editTask = (task) => {
//     setTask(task.text);
//     setEditingTaskId(task.id);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.taskItem}>
//       <TouchableOpacity onPress={() => toggleDone(item.id)}>
//         <AntDesign
//           name={item.done ? "checkcircle" : "checkcircleo"}
//           size={24}
//           color={item.done ? "green" : "gray"}
//         />
//       </TouchableOpacity>

//       <Text style={[styles.taskText, item.done && styles.taskDone]}>
//         {item.text}
//       </Text>

//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => editTask(item)} style={styles.icon}>
//           <Feather name="edit-2" size={20} color="#2196f3" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.icon}>
//           <Feather name="trash-2" size={20} color="#f44336" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Ma Liste de Tâches 📝</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder={editingTaskId ? "Modifier la tâche..." : "Ajouter une tâche"}
//           value={task}
//           onChangeText={setTask}
//         />

//         {editingTaskId ? (
//           <>
//             <TouchableOpacity onPress={addTask} style={styles.iconButton}>
//               <Feather name="check" size={24} color="#fff" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setEditingTaskId(null);
//                 setTask("");
//               }}
//               style={[styles.iconButton, { backgroundColor: "#f44336" }]}
//             >
//               <Feather name="x" size={24} color="#fff" />
//             </TouchableOpacity>
//           </>
//         ) : (
//           <TouchableOpacity onPress={addTask} style={styles.iconButton}>
//             <Feather name="plus" size={24} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 6,
//     borderColor: "#ddd",
//     borderWidth: 1,
//   },
//   iconButton: {
//     backgroundColor: "#2196f3",
//     padding: 10,
//     borderRadius: 6,
//     marginLeft: 5,
//   },
//   taskItem: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 6,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   taskText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   taskDone: {
//     textDecorationLine: "line-through",
//     color: "gray",
//   },
//   actions: {
//     flexDirection: "row",
//     marginLeft: 10,
//   },
//   icon: {
//     marginLeft: 10,
//   },
// });
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AntDesign, Feather } from "@expo/vector-icons";

// export default function App() {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   useEffect(() => {
//     saveTasks();
//   }, [tasks]);

//   const loadTasks = async () => {
//     try {
//       const storedTasks = await AsyncStorage.getItem("tasks");
//       if (storedTasks) {
//         setTasks(JSON.parse(storedTasks));
//       }
//     } catch (error) {
//       Alert.alert("Erreur", "Impossible de charger les tâches.");
//     }
//   };

//   const saveTasks = async () => {
//     try {
//       await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
//     } catch (error) {
//       Alert.alert("Erreur", "Impossible d'enregistrer les tâches.");
//     }
//   };

//   const addTask = () => {
//     if (!task.trim()) return;

//     if (editingTaskId !== null) {
//       const updatedTasks = tasks.map((t) =>
//         t.id === editingTaskId ? { ...t, text: task } : t
//       );
//       setTasks(updatedTasks);
//       setEditingTaskId(null);
//     } else {
//       const newTask = {
//         id: Date.now().toString(),
//         text: task,
//         done: false,
//       };
//       setTasks([...tasks, newTask]);
//     }

//     setTask("");
//   };

//   const deleteTask = (id) => {
//     Alert.alert("Supprimer", "Voulez-vous supprimer cette tâche ?", [
//       { text: "Annuler" },
//       {
//         text: "Supprimer",
//         onPress: () => setTasks(tasks.filter((t) => t.id !== id)),
//         style: "destructive",
//       },
//     ]);
//   };

//   const toggleDone = (id) => {
//     const updatedTasks = tasks.map((t) =>
//       t.id === id ? { ...t, done: !t.done } : t
//     );
//     setTasks(updatedTasks);
//   };

//   const editTask = (task) => {
//     setTask(task.text);
//     setEditingTaskId(task.id);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.taskItem}>
//       <TouchableOpacity onPress={() => toggleDone(item.id)}>
//         <AntDesign
//           name={item.done ? "checkcircle" : "checkcircleo"}
//           size={24}
//           color={item.done ? "green" : "gray"}
//         />
//       </TouchableOpacity>

//       <Text style={[styles.taskText, item.done && styles.taskDone]}>
//         {item.text}
//       </Text>

//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => editTask(item)} style={styles.icon}>
//           <Feather name="edit-2" size={20} color="#2196f3" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.icon}>
//           <Feather name="trash-2" size={20} color="#f44336" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Ma Liste de Tâches 📝</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder={editingTaskId ? "Modifier la tâche..." : "Ajouter une tâche"}
//           value={task}
//           onChangeText={setTask}
//         />

//         {editingTaskId ? (
//           <>
//             <TouchableOpacity onPress={addTask} style={styles.iconButton}>
//               <Feather name="check" size={24} color="#fff" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setEditingTaskId(null);
//                 setTask("");
//               }}
//               style={[styles.iconButton, { backgroundColor: "#f44336" }]}
//             >
//               <Feather name="x" size={24} color="#fff" />
//             </TouchableOpacity>
//           </>
//         ) : (
//           <TouchableOpacity onPress={addTask} style={styles.iconButton}>
//             <Feather name="plus" size={24} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 6,
//     borderColor: "#ddd",
//     borderWidth: 1,
//   },
//   iconButton: {
//     backgroundColor: "#2196f3",
//     padding: 10,
//     borderRadius: 6,
//     marginLeft: 5,
//   },
//   taskItem: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 6,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   taskText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   taskDone: {
//     textDecorationLine: "line-through",
//     color: "gray",
//   },
//   actions: {
//     flexDirection: "row",
//     marginLeft: 10,
//   },
//   icon: {
//     marginLeft: 10,
//   },
// });
