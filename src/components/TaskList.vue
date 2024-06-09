<template>
    <div class="task-list-container">
      <h2>Daftar Tugas</h2>
      <div class="input-container">
        <input v-model="newTask" placeholder="Tambahkan tugas baru" />
        <button @click="addTask">Tambah</button>
      </div>
      <ul>
        <transition-group name="fade" tag="div">
          <li v-for="(task, index) in filteredTasks" :key="task.id" class="task-item">
            <input type="checkbox" v-model="task.completed" @change="saveTasks" />
            <span :class="{ completed: task.completed }" @dblclick="editTask(index)">
              {{ task.text }}
            </span>
            <button @click="removeTask(index)">Hapus</button>
          </li>
        </transition-group>
      </ul>
      <div class="filter-buttons">
        <button @click="filter='all'" :class="{ active: filter === 'all' }">Semua</button>
        <button @click="filter='completed'" :class="{ active: filter === 'completed' }">Selesai</button>
        <button @click="filter='active'" :class="{ active: filter === 'active' }">Belum Selesai</button>
      </div>
      <div class="task-count">Tugas Belum Selesai: {{ incompleteTasksCount }}</div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useTasksStore } from '../stores/tasks';
  
  export default {
    setup() {
      const newTask = ref('');
      const filter = ref('all');
  
      const tasksStore = useTasksStore();
  
      const filteredTasks = computed(() => {
        if (filter.value === 'completed') {
          return tasksStore.tasks.filter(task => task.completed);
        } else if (filter.value === 'active') {
          return tasksStore.tasks.filter(task => !task.completed);
        }
        return tasksStore.tasks;
      });
  
      const incompleteTasksCount = computed(() => tasksStore.incompleteTasksCount);
  
      const addTask = () => {
        if (newTask.value.trim() !== '') {
          tasksStore.addTask({ id: Date.now(), text: newTask.value, completed: false });
          newTask.value = '';
        }
      };
  
      const removeTask = (index) => {
        tasksStore.removeTask(index);
      };
  
      const saveTasks = () => {
        tasksStore.saveTasks();
      };
  
      const editTask = (index) => {
        const newTaskText = prompt("Edit Tugas", tasksStore.tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
          tasksStore.tasks[index].text = newTaskText;
          saveTasks();
        }
      };
  
      return {
        newTask,
        filter,
        filteredTasks,
        incompleteTasksCount,
        addTask,
        removeTask,
        saveTasks,
        editTask
      };
    }
  };
  </script>
  
<style scoped>
/* General Styling */
.task-list-container {
  background-color: #252525; /* Dark background */
  color: #d9d9d9; /* Faded text */
  font-family: 'Fira Code', monospace; /* Monospace for a techy feel */
  padding: 20px;
  border: 2px solid #555;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5); /* Dramatic shadow */
  width: 95%;
  max-width: 900px;
  margin: 50px auto; /* Center the container */
}

h2 {
  color: #ff5555; /* Reddish for danger */
  text-shadow: 0 0 5px rgba(255, 85, 85, 0.8); /* Glowing effect */
  margin-bottom: 15px;
  text-align: center;
}

/* Input Area */
.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}

input[type="text"] {
  background-color: #333;
  color: #ddd;
  border: 1px solid #555;
  padding: 8px;
  flex-grow: 1;
  margin-right: 5px;
  border-radius: 3px;
  transition: border-color 0.3s, background-color 0.3s;
  width: 100%; /* Menggunakan 100% width agar memanjang sepanjang container */
  max-width: 600px; /* Maksimum lebar untuk input */
  box-sizing: border-box;
}

input[type="text"]:focus {
  border-color: #ff5555;
  background-color: #444;
  outline: none;
}

button {
  background-color: #555;
  color: #ddd;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  border-radius: 3px;
}

button:hover {
  background-color: #777;
}

button:active {
  transform: scale(0.95);
}

/* Task List */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  background-color: #333;
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid #555;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: background-color 0.3s, transform 0.2s;
}

.task-item:hover {
  background-color: #444;
}

input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #ff5555; /* Red checkbox */
  width: 18px;
  height: 18px;
  transition: transform 0.2s;
}

input[type="checkbox"]:hover {
  transform: scale(1.2);
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.task-item span {
  flex-grow: 1;
  cursor: pointer;
  transition: color 0.3s;
}

.task-item span:hover {
  color: #fff;
}

button {
  background-color: #ff5555;
  border: none;
  color: #fff;
  padding: 6px 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  border-radius: 3px;
}

button:hover {
  background-color: #ff7777;
}

button:active {
  transform: scale(0.95);
}

/* Filter Buttons */
.filter-buttons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.filter-buttons button {
  margin-right: 5px;
  background-color: #555;
  color: #ddd;
  padding: 6px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-buttons button:last-child {
  margin-right: 0;
}

.filter-buttons button.active {
  background-color: #ff5555;
  color: #222;
}

.filter-buttons button:hover {
  background-color: #777;
}

/* Task Count */
.task-count {
  margin-top: 15px;
  font-size: 0.9em;
  text-align: center;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>