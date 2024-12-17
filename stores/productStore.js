import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "http://dev.mindwave.kz/api/sandbox/crud"
        );
        this.products = response.data.content.rows;
        console.log("Response Data:", response.data.content.rows);
        //fetched data as a object nice job ')
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async createProduct(product) {
      try {
        await axios.post("http://dev.mindwave.kz/api/sandbox/crud", product);
        await this.fetchProducts();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
    async updateProduct(id, updatedProduct) {
      try {
        await axios.put(
          `http://dev.mindwave.kz/api/sandbox/crud/${id}`,
          updatedProduct
        );
        await this.fetchProducts();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://dev.mindwave.kz/api/sandbox/crud/${id}`);
        await this.fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
});
