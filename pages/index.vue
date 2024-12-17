<template>
  <div class="crud-container">
    <h1 class="title">CRUD Operations</h1>

    <!-- Create Product Form -->
    <form class="product-form" @submit.prevent="createNewProduct">
      <input
        v-model="newProduct.product_name"
        class="input-field"
        placeholder="Product Name"
      />
      <input
        v-model.number="newProduct.product_amount"
        class="input-field"
        type="number"
        placeholder="Amount"
      />
      <button type="submit" class="btn btn-create">Create Product</button>
    </form>

    <!-- Product List -->
    <ul class="product-list">
      <li
        v-for="product in productStore.products"
        :key="product.id"
        class="product-item"
      >
        <span class="product-name">{{ product.product_name }}</span>
        <span class="product-amount">({{ product.product_amount }})</span>
        <button @click="editProduct(product.id)" class="btn btn-edit">
          Edit
        </button>
        <button @click="deleteProduct(product.id)" class="btn btn-delete">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useProductStore } from "~/stores/productStore";
import "./index.css";

const productStore = useProductStore();

productStore.fetchProducts();

const newProduct = reactive({
  product_name: "",
  product_amount: 1,
});

const createNewProduct = () => {
  productStore.createProduct({ ...newProduct });
  newProduct.product_name = "";
  newProduct.product_amount = 1;
};

const editProduct = (id) => {
  const updatedProduct = {
    product_name: prompt("Enter new product name:"),
    product_amount: parseInt(prompt("Enter new product amount:"), 10),
  };
  productStore.updateProduct(id, updatedProduct);
};

const deleteProduct = (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    productStore.deleteProduct(id);
  }
};
</script>
