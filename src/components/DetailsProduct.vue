<!-- Le style de DetailsProduct a été généré par ChatGPT (couleurs, classes bootstrap, etc.)-->

<script setup lang="ts">
import type { Product } from "../types/types";

defineProps<{ product: Product }>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
    <div class="bg-white p-4 rounded shadow-lg text-center w-50">
      <h2 class="mb-3">{{ product.name }}</h2>
      <p>Prix {{ product.price }}$</p>
      <p>Poids: {{ product.weight }} kg</p>
      <p>Stock: {{ product.stock }}</p>
      <p>Catégorie: {{ product.category }}</p>
      <p>Description: {{ product.description }}</p>
      <button class="btn btn-danger mt-3" @click="emit('close')">Fermer</button>
    </div>
  </div>
</template>

