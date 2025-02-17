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
            <a :href="`${apiUrl}${folderName}/${file.name}`" download>
              Download
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No files found in this folder.</p>
    <br />
    <router-link :to="`/data`"> Back to Data</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL;
const folderName = useRoute().params.folder;
const files = ref([]);

// Fetch files for the selected folder
onMounted(() => {
  fetch(`${apiUrl}fileList.json`)
    .then((response) => response.json())
    .then((data) => {
      const folder = data.find((item) => item.folder === folderName);
      if (folder && folder.files) {
        files.value = folder.files;
      }
    })
    .catch((error) => console.error("Error loading files:", error));
});
</script>
