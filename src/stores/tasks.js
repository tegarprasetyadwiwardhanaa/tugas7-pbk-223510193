import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);

  const addTask = (task) => {
    tasks.value.push(task);
  };

  const removeTask = (index) => {
    tasks.value.splice(index, 1);
  };

  const saveTasks = () => {
    // Here you can implement
// save tasks to a persistent storage if needed
  };

const incompleteTasksCount = computed(() => tasks.value.filter(task => !task.completed).length);

return {
  tasks,
  addTask,
  removeTask,
  saveTasks,
  incompleteTasksCount,
};
});