<template>
  <div>
    <h2>Subfolders:</h2>
    <ul>
      <li v-for="folder in folders" :key="folder.folder">
        <router-link :to="`/data/${folder.folder}`" class="folder-link">
          {{ folder.folder }}
        </router-link>
      </li>
    </ul>
    <router-link to="/" class="back-button">Back to Home Page</router-link>
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

<style scoped>
h2 {
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

folder-link {
  text-decoration: none;
  color: #3498db;
}

/* Preventing the purple color after clicking */
folder-link:visited {
  color: #3498db;
}

folder-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* Styling for the back button */
.back-button {
  display: inline-block;
  padding: 8px 16px;
  margin-top: 20px;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
}

.back-button:hover {
  background-color: #2ecc71;
}
</style>
