<!-- Le style de NewProduct a été généré par ChatGPT (couleurs, classes, css etc.) -->


<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product } from "../types/types";
import {
  validateName,
  validatePrice,
  validateDescription,
  validateWeight,
  validateStock,
  validateCategory,
} from "../scripts/validations";

const emit = defineEmits(["add-product", "export-to-csv"]);
const props = defineProps({
  product: {
    type: Object as () => Product | null,
    default: null,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const exportToCSV = () => {
  emit("export-to-csv");
};


const name = ref("");
const price = ref("");
const description = ref("");
const weight = ref("");
const category = ref("");
const stock = ref("");
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      name.value = newProduct.name;
      price.value = newProduct.price.toString();
      description.value = newProduct.description;
      weight.value = newProduct.weight.toString();
      category.value = newProduct.category;
      stock.value = newProduct.stock.toString();
    } else {
      name.value = "";
      price.value = "";
      description.value = "";
      weight.value = "";
      category.value = "";
      stock.value = "";
    }
  },
  { immediate: true }
);

const submitForm = () => {
  const nameError = validateName(name.value);
  const priceError = validatePrice(price.value);
  const descriptionError = validateDescription(description.value);
  const weightError = validateWeight(weight.value);
  const stockError = validateStock(stock.value);
  const categoryError = validateCategory(category.value);

  const errors = [
    nameError,
    priceError,
    descriptionError,
    weightError,
    stockError,
    categoryError,
  ];

  const filteredErrors = errors.filter((error) => error !== null);

  if (filteredErrors.length > 0) {
    alert(`Pour ajouter le vélo, régler les erreurs suivantes :\n${filteredErrors.join("\n")}`); // L'idée de filtrer les erreurs null provient de AppWebGPT
    return;
  }

  const newProduct: Product = {
    id: props.product?.id || 0,
    name: name.value,
    price: parseFloat(price.value),
    description: description.value,
    weight: parseFloat(weight.value),
    category: category.value,
    stock: parseInt(stock.value),
  };

  emit("add-product", newProduct);

  name.value = "";
  price.value = "";
  description.value = "";
  weight.value = "";
  category.value = "";
  stock.value = "";
};

</script>

<template>
  <div class="mt-5 d-flex justify-content-center text-white text-center w-100 mb-5">
    <div class="p-4 rounded bg-light text-dark w-75 border border-dark">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="name" class="form-label">Modèle du vélo</label>
            <input v-model="name" type="text" class="form-control" id="name" placeholder="Nom du modèle" />
          </div>

          <div class="col-md-4 mb-3">
            <label for="price" class="form-label">Prix ($)</label>
            <input v-model="price" type="text" class="form-control" id="price" placeholder="Prix" />
          </div>

          <div class="col-md-4 mb-3">
            <label for="description" class="form-label">Description</label>
            <input v-model="description" type="text" class="form-control" id="description" placeholder="Description du vélo" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="weight" class="form-label">Poids (kg)</label>
            <input v-model="weight" type="text" class="form-control" id="weight" placeholder="Poids en kg" />
          </div>

          <div class="col-md-4 mb-3">
            <label for="stock" class="form-label">Stock</label>
            <input v-model="stock" type="text" class="form-control" id="stock" placeholder="Quantité en stock" />
          </div>

          <div class="col-md-4 mb-3">
            <label for="category" class="form-label">Catégorie</label>
            <input v-model="category" type="text" class="form-control" id="category" placeholder="Catégorie" />
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn text-white border-0 shadow-none" :style="{ backgroundColor: '#FC8403' }">
            {{ isEditing ? "Modifier et enregistrer le vélo" : "Ajouter un vélo" }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="d-flex justify-content-center mt-2 mb-4">
  <button @click="exportToCSV" class="btn btn-success">Exporter la liste de tous les vélos en fichier CSV</button>
</div>

</template>