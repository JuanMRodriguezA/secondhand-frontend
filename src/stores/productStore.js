// src/stores/productStore.js
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Blazer vintage oversize",
        brand: "Zara",
        price: 25.99,
        condition: "Como nuevo",
        category: "Ropa",
        size: "M",
        image:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Blazer de corte oversize en tono beige, perfecto para looks casuales o de oficina. Tejido de algodón, solapa clásica y botones dorados. En excelente estado, sin defectos.",
        featured: true,
        visible: true,
        sold: false,
      },
      {
        id: 2,
        name: "Jeans mom fit azul",
        brand: "Levi's",
        price: 32.5,
        condition: "Buen estado",
        category: "Ropa",
        size: "28",
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Jeans clásicos mom fit de tiro alto, color azul medio. Ligeros desgastes en muslos y bastas. Cierre con botón y cremallera. Buen estado, solo pequeños signos de uso.",
        featured: true,
        visible: true,
        sold: false,
      },
      {
        id: 3,
        name: "Champion blancas",
        brand: "Converse",
        price: 28.75,
        condition: "Ligeramente usado",
        category: "Calzado",
        sizes: [36, 37, 38, 39, 40, 41],
        image:
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Zapatillas Converse clásicas en color blanco. Suela y laterales ligeramente amarillentos por el tiempo, pero en muy buen estado estructural.",
        featured: false,
        visible: true,
        sold: false,
      },
      {
        id: 4,
        name: "Vestido midi floral",
        brand: "Mango",
        price: 19.99,
        condition: "Como nuevo",
        category: "Ropa",
        size: "S",
        image:
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1583846717392-8f6d7c0de5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Vestido midi con estampado floral en tonos rosa y verde. Escote en V, manga corta y cierre en la espalda. Tejido ligero, perfecto para primavera. Sin usar, con etiqueta.",
        featured: false,
        visible: true,
        sold: false,
      },
      {
        id: 5,
        name: "Sneakers deportivas",
        brand: "Nike",
        price: 42.0,
        condition: "Buen estado",
        category: "Calzado",
        sizes: [38, 39, 40, 41, 42, 43],
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Zapatillas deportivas Nike modelo Air. Color blanco con detalles negros. Suela en buen estado, ligeras marcas de uso en la parte frontal. Muy cómodas.",
        featured: true,
        visible: true,
        sold: false,
      },
      {
        id: 6,
        name: "Camiseta básica algodón",
        brand: "Uniqlo",
        price: 8.99,
        condition: "Buen estado",
        category: "Ropa",
        size: "L",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1503342562290-3b5e3c1e1d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Camiseta básica de algodón 100%, color negro. Corte regular, cuello redondo. Ha sido usada pocas veces, sin manchas ni deformaciones.",
        featured: false,
        visible: true,
        sold: false,
      },
      {
        id: 7,
        name: "Falda plisada negra",
        brand: "H&M",
        price: 15.5,
        condition: "Como nuevo",
        category: "Ropa",
        size: "M",
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Falda plisada larga color negro. Cintura elástica, ideal para combinar. Sin uso, etiqueta original.",
        featured: false,
        visible: true,
        sold: false,
      },
      {
        id: 8,
        name: "Botines tacón bajo",
        brand: "Pull & Bear",
        price: 35.0,
        condition: "Ligeramente usado",
        category: "Calzado",
        sizes: [35, 36, 37, 38, 39, 40],
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1608256246200-53e635b7089c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        description:
          "Botines negros con tacón bajo (3 cm). Puntera redonda, cremallera lateral. Ligero uso en la suela, cuero en buen estado.",
        featured: true,
        visible: true,
        sold: false,
      },
    ],
    brands: ["Zara", "Levi's", "Converse", "Mango", "Nike", "Uniqlo", "H&M", "Pull & Bear"],
  }),

  getters: {
    newProducts: (state) => state.products.filter((p) => p.featured),
    getProductById: (state) => (id) => state.products.find((p) => p.id === id),
    getAllBrands: (state) => state.brands,
  },

  actions: {
    addProduct(product) {
      // Generar nuevo ID (el máximo + 1)
      const maxId = this.products.reduce((max, p) => Math.max(max, p.id), 0);
      const newProduct = {
        ...product,
        id: maxId + 1,
        // Asegurar que tenga los campos administrativos por defecto
        visible: product.visible ?? true,
        sold: product.sold ?? false,
        featured: product.featured ?? false,
      };
      this.products.push(newProduct);
    },

    updateProduct(id, updatedProduct) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          ...updatedProduct,
          id, // mantener el mismo id
        };
      }
    },

    deleteProduct(id) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    },
    addBrand(brand) {
      if (!this.brands.includes(brand)) {
        this.brands.push(brand);
      }
    },

    // Método para obtener todas las marcas únicas (útil para el selector)
    getUniqueBrands() {
      const brands = this.products.map((p) => p.brand).filter(Boolean);
      return [...new Set(brands)];
    },
  },
});
