import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this.tasks = data;
    },
    async addTask(task) {
      this.tasks.push(task);
      console.log(JSON.stringify(task));
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      console.log("res", res);
      if (res.error) {
        console.log(res.error);
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((el) => {
        return el.id !== id;
      });
    },
    toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    },
  },
});
