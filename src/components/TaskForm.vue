<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button>Add Task</button>
  </form>
</template>
<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
export default {
  setup() {
    const taskStore = useTaskStore();

    const newTask = ref("");

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: Math.floor(Math.random() * 100000),
        });
        console.log("taskStore", taskStore.tasks);
        newTask.value = "";
      }
    };
    return { handleSubmit, newTask };
  },
};
</script>
