<template>
  <div>
    <h3>Subfolders:</h3>
    <ul>
      <li v-for="folder in folders" :key="folder.folder">
        <router-link :to="`/data/${folder.folder}`">
          {{ folder.folder }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const folders = ref([]);

onMounted(() => {
  const apiUrl = import.meta.env.VITE_API_URL;
  fetch(`${apiUrl}fileList.json`)
    .then((response) => response.json())
    .then((data) => (folders.value = data))
    .catch((error) => console.error("Error loading folders:", error));
});
</script>
