import { ref } from "vue";
import { defineStore } from "pinia";

export const useSearchStringStore = defineStore("searchString", () => {
  const searchString = ref<string>("all");

  function setSearchString(value: string) {
    searchString.value = value;
  }

  return { setSearchString, searchString };
});
