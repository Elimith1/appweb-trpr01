<!-- Le style de ProductList a été généré par ChatGPT (couleurs, classes, css etc.) -->

<script setup lang="ts">
import type { Product } from "../types/types";
import { defineProps } from "vue";

defineProps<{ products: Product[] }>();

const emit = defineEmits(["delete-product", "edit-product", "duplicate-product", "show-details"]);

const deleteProduct = (id: number) => {
  emit("delete-product", id);
};

const editProduct = (product: Product) => {
  emit("edit-product", product);
};

const duplicateProduct = (product: Product) => {
  emit("duplicate-product", product);
};

const showDetails = (product: Product) => {
  emit("show-details", product);
};
</script>

<template>
  <div class="w-75 container bg-light rounded p-3">
    <h2>Liste des produits</h2>
    <p v-if="products.some(product => product.stock === 0)" class="text-danger fw-bold ">
      Attention !
      <p v-for="(product) in products" :key="product.id">
        <template v-if="product.stock === 0">
          Le produit {{ product.name }} est en rupture de stock 
        </template>
      </p>
    </p>
    <table>
      <thead>
        <tr>
          <th>Modèle du vélo</th>
          <th>Prix ($)</th>
          <th>Poids (kg)</th>
          <th>Stock</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-decoration-underline">{{ product.name }}</td>
          <td class="text-center">{{ product.price }}</td>
          <td class="text-center">{{ product.weight }}</td>
          <td :class="['text-white', 'text-center',
          product.stock === 0 ? 'bg-danger' :
          product.stock >= 1 && product.stock <= 10 ? 'bg-warning' :
          'bg-success']">
          {{ product.stock }}</td>
          <td class="text-center">{{ product.category }}</td>
          <td class="border-0">
            <div class="d-flex gap-2">
              <div class="p-2 border rounded bg-danger text-white text-center">
                <button @click="deleteProduct(product.id)" class="btn bg-transparent text-white btn-sm w-100 border-0 shadow-none">Supprimer</button>
              </div>
              <div class="p-2 border rounded bg-warning text-white text-center">
                <button @click="editProduct(product)" class="btn bg-transparent text-white btn-sm w-100 border-0 shadow-none">Modifier</button>
              </div>
              <div class="p-2 border rounded bg-primary text-white text-center">
                <button @click="duplicateProduct(product)" class="btn bg-transparent text-white btn-sm w-100 border-0 shadow-none">Dupliquer</button>
              </div>
              <div class="p-2 border rounded bg-light text-white text-center">
                <button @click="showDetails(product)" class="btn bg-transparent text-dark btn-sm w-100 border-0 shadow-none">Détails</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>