import { defineStore } from 'pinia';

export const useCategoriasStore = defineStore({
  id: 'categorias',
  state: () => ({
    categorias: JSON.parse(localStorage.getItem('categorias')) || [],
  }),
  actions: {
    agregarCategoria(categoria) {
      categoria.id = Date.now();
      this.categorias.push(categoria);
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
    },
    actualizarCategoria(id, datosActualizados) {
      const categoria = this.categorias.find(c => c.id === id);
      if (categoria) {
        Object.assign(categoria, datosActualizados);
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
      }
    },
    eliminarCategoria(id) {
      this.categorias = this.categorias.filter(c => c.id !== id);
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
    },obtenerCategoria: (state) => (id) => {
      return state.categorias.find(categoria => categoria.id === id);
    },
  },
});