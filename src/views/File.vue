<template>
  <div class="file-preview-container">
    <h3 class="file-title">Preview of {{ fileName }}</h3>

    <a :href="fileUrl" download class="download-link"
      >Download {{ fileName }}</a
    >
    <router-link :to="`/data/${folderName}`" class="back-button"
      >Back to Parent Folder</router-link
    >
    <table v-if="csvData.length" class="csv-table">
      <thead>
        <tr>
          <th v-for="(header, index) in csvData[0]" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in csvData.slice(1)" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const fileName = route.params.file;
const folderName = route.params.folder;
const fileUrl = `${import.meta.env.VITE_API_URL}${folderName}/${fileName}`;
const csvData = ref([]);

const parseCSV = (csvText) => {
  const rows = csvText.split("\n").map((row) => row.split(","));
  return rows;
};

onMounted(() => {
  fetch(fileUrl)
    .then((response) => response.text())
    .then((text) => {
      csvData.value = parseCSV(text);
    })
    .catch((error) => console.error("Error loading CSV file:", error));
});
</script>

<style scoped>
.file-preview-container {
  margin: 20px;
}

.file-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
}

.csv-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.csv-table th,
.csv-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.csv-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.csv-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.download-link {
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.download-link:hover {
  background-color: #2980b9;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #16a085;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #1abc9c;
}
</style>
