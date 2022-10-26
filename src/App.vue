<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
const $rotue = useRoute();
const layout = computed(() => $rotue.meta.layout);
</script>

<template>
  <suspense>
    <div>
      <component :is="layout">
        <router-view :key="$rotue.path" />
      </component>
    </div>
  </suspense>
</template>

<style>
#app {
  text-align: center;
  background-color: #ecebe9;
}
</style>
