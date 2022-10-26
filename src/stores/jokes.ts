// import { ref } from "vue";
// import { defineStore } from "pinia";
// import type { Result } from "@/types/jokes";
// import { $api } from "@/services";

// export const useJokesStore = defineStore("jokeStore", () => {

//   const listJobs = ref<Result[]>([]);

//   async function fetchJokes(value: string) {
//     const [err, res] = await $api.jokeService.getAllJokes(value);
//     if (err) {
//       console.error(err);
//     } else {
//       listJobs.value = res.result;
//     }
//   }

//   return { listJobs, fetchJokes };
// });

import { $api } from "@/services";
import type { Result } from "@/types/jokes";
import { defineStore } from "pinia";

const useJokesStore = defineStore({
  id: "jokeStore",
  state: () => ({
    listJobs: [] as Result[],
  }),
  getters: {},
  actions: {
    async fetchJokes(value: string) {
      const [err, res] = await $api.jokeService.getAllJokes(value);
      if (!err && res) {
        this.listJobs = res.result;
      }
    },
  },
});
export default useJokesStore;
