<template>
  <div>
    <h3 class="folder-title">Files in {{ folderName }}:</h3>

    <table v-if="files.length" class="files-table">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Preview</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.name">
          <td>{{ file.name }}</td>
          <td>
            <router-link
              :to="`/data/${folderName}/${file.name}`"
              class="preview-link"
            >
              Preview
            </router-link>
          </td>
          <td>
            <a
              :href="`${apiUrl}${folderName}/${file.name}`"
              download
              class="download-link"
            >
              Download
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No files found in this folder.</p>

    <br />

    <router-link :to="`/data`" class="back-link">Back to Data</router-link>
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

<style scoped>
.folder-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.files-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.files-table th,
.files-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.files-table th {
  background-color: #f7f7f7;
  font-weight: bold;
}

.files-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.files-table tbody tr:hover {
  background-color: #f1f1f1;
}

.preview-link,
.download-link {
  text-decoration: none;
  color: #3498db;
}

.preview-link:hover,
.download-link:hover {
  text-decoration: underline;
}

.back-link {
  display: inline-block;
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-link:hover {
  background-color: #27ae60;
}
</style>
