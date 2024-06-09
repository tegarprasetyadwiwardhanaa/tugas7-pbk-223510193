<template>
  <div id="app">
    <main>
      <TaskList />
    </main>
    <footer>
      <p>&copy; 2024 Tegar Prasetya Dwi Wardhana. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: {
    TaskList
  }
};
</script>

<style>

</style>
