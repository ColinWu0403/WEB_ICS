<template>
  <div>
    <h3>Files in {{ folderName }}:</h3>
    <table v-if="files.length">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.name">
          <td>{{ file.name }}</td>
          <td>
            <router-link :to="`/data/${folderName}/${file.name}`">
              Preview
            </router-link>
            |
            <a :href="`${apiUrl}${file.url}`" download> Download </a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading files...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const files = ref([]);
const folderName = route.params.folder;
const folderPath = `${import.meta.env.VITE_API_URL}/data`; // Move this outside the template

// Add a computed property for the URL
const apiUrl = import.meta.env.VITE_API_URL;

onMounted(() => {
  fetch(`${folderPath}/fileList.json`)
    .then((response) => response.json())
    .then((data) => {
      const folder = data.find((item) => item.folder === folderName);
      if (folder) {
        files.value = folder.files;
      }
    })
    .catch((error) => console.error("Error loading files:", error));
});
</script>
