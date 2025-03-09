<!-- Le style du SearchBar a été généré par ChatGPT (couleurs, classes, etc.) -->

<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");

const emit = defineEmits(["search"]);

const handleSearch = () => {
  emit("search", searchQuery.value);
};
</script>

<template>
  <div class="container d-flex justify-content-center w-50 bg-green rounded p-3 mt-4 mb-4">
    <div class="input-group container">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Rechercher un vélo avec son modèle"
      />
      <button
        class="btn btn-outline-secondary bg-light"
        type="button"
        @click="handleSearch"
      >
        Chercher
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>