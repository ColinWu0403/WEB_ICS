<template>
  <div>
    <h3>Preview of {{ fileName }}</h3>
    <div v-if="fileContent.length">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <a :href="fileUrl" download>Download {{ fileName }}</a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Papa from "papaparse"; // CSV parsing library

const route = useRoute();
const folderName = route.params.folder;
const fileName = route.params.file;
const fileUrl = `${
  import.meta.env.VITE_API_URL
}/data/${folderName}/${fileName}`;
const fileContent = ref("");
const headers = ref([]);
const rows = ref([]);

onMounted(() => {
  fetch(fileUrl)
    .then((response) => response.text())
    .then((text) => {
      fileContent.value = text;
      parseCSV(text);
    })
    .catch((error) => console.error("Error loading file:", error));
});

function parseCSV(csvText) {
  // Use PapaParse to parse the CSV text
  Papa.parse(csvText, {
    complete: (result) => {
      headers.value = result.data[0]; // First row as header
      rows.value = result.data.slice(1); // All other rows as data
    },
    header: false, // We're using the first row as headers
  });
}
</script>
