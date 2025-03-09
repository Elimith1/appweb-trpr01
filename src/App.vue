<!-- Le style du App.vue a été généré par ChatGPT (couleurs, classes, etc.) -->
<!-- Les produits pour le peuplement de ma liste de vélos ont été générés par ChatGPT-->

<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "./types/types";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ProductList from "./components/ProductList.vue";
import SearchBar from "./components/SearchBar.vue";
import NewProduct from "./components/NewProduct.vue";
import DetailsProduct from "./components/DetailsProduct.vue";

const products = ref<Product[]>([
  {
    id: 1,
    name: "Trek Marlin 6",
    price: 849.99,
    description: "Un vélo de montagne léger et robuste, idéal pour les sentiers.",
    weight: 14.5,
    category: "Montagne",
    stock: 0,
  },
  {
    id: 2,
    name: "Giant Talon 2",
    price: 799.99,
    description: "Un vélo semi-rigide performant pour les débutants et intermédiaires.",
    weight: 13.8,
    category: "Hybride",
    stock: 5,
  },
  {
    id: 4,
    name: "Cannondale Synapse Carbon 105",
    price: 2199.99,
    description: "Un vélo de route en carbone, conçu pour la vitesse et le confort sur longue distance.",
    weight: 8.7,
    category: "Route",
    stock: 4,
  },
]);

const filteredProducts = ref<Product[]>(products.value);
const selectedProduct = ref<Product | null>(null);
const selectedDetailedProduct = ref<Product | null>(null);
const isEditing = ref(false);

const handleSearch = (query: string) => {
  if (!query) {
    filteredProducts.value = products.value;
  } else {
    filteredProducts.value = products.value.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
};

const addProduct = (newProduct: Product) => {
  if (isEditing.value) {
    const index = products.value.findIndex((p) => p.id === newProduct.id);
    if (index !== -1) {
      products.value[index] = newProduct;
    }
  } else {
    const newId = products.value.length ? Math.max(...products.value.map((p) => p.id)) + 1 : 1;
    products.value.push({ ...newProduct, id: newId });
  }

  selectedProduct.value = null;
  isEditing.value = false;
  handleSearch("");
};


const deleteProduct = (id: number) => {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  if (confirmation) {
    products.value = products.value.filter((product) => product.id !== id);
    handleSearch("");
  }
};

const handleEdit = (product: Product) => {
  selectedProduct.value = product;
  isEditing.value = true;
};

const handleDuplicate = (product: Product) => {
  selectedProduct.value = { ...product, id: 0 };
  isEditing.value = false;
};

const handleShowDetails = (product: Product) => {
  selectedDetailedProduct.value = product;
};

const closeDetails = () => {
  selectedDetailedProduct.value = null;
};

const exportToCSV = () => {
  const csvContent = "data:text/csv;charset=utf-8," +
    products.value.map(p => `${p.id},${p.name},${p.price},${p.weight},${p.stock},${p.category},${p.description}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.href = encodedUri;
  link.setAttribute("download", "products.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


</script>

<template>
  <Header />
  <div class="d-flex flex-column min-vh-100 background-container">
    <main class="flex-grow-1">
      <SearchBar @search="handleSearch" />

      <DetailsProduct v-if="selectedDetailedProduct" :product="selectedDetailedProduct" @close="closeDetails" />

      <NewProduct
        @add-product="addProduct"
        :product="selectedProduct"
        :isEditing="isEditing"
        @export-to-csv="exportToCSV"/>

      <ProductList
      :products="filteredProducts"
      @delete-product="deleteProduct"
      @edit-product="handleEdit"
      @duplicate-product="handleDuplicate"
      @show-details="handleShowDetails"/>
    
    </main>
  <Footer />
  </div>
</template>

<style scoped>
.background-container {
  background-image: url('/src/assets/images/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>