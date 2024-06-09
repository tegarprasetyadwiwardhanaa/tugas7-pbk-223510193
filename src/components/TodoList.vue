<template>
    <div>
      <h2>Daftar Tugas</h2>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Tambahkan tugas baru">
      <ul>
        <li v-for="(task, index) in filteredTasks" :key="index">
          <input type="checkbox" v-model="task.completed" @change="saveTasks">
          <span :class="{ completed: task.completed }" @dblclick="editTask(index)">{{ task.text }}</span>
          <button @click="removeTask(index)">Hapus</button>
        </li>
      </ul>
      <div>
        <button @click="filter='all'">Semua</button>
        <button @click="filter='completed'">Selesai</button>
        <button @click="filter='active'">Belum Selesai</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: '',
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
        filter: 'all',
      };
    },
    computed: {
      filteredTasks() {
        if (this.filter === 'completed') {
          return this.tasks.filter(task => task.completed);
        } else if (this.filter === 'active') {
          return this.tasks.filter(task => !task.completed);
        }
        return this.tasks;
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim() !== '') {
          this.tasks.push({ text: this.newTask, completed: false });
          this.newTask = '';
          this.saveTasks();
        }
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
      },
      saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      editTask(index) {
        const newTaskText = prompt("Edit Tugas", this.tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
          this.tasks[index].text = newTaskText;
          this.saveTasks();
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  