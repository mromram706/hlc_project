import { defineStore} from 'pinia';

export const useExamenesStore = defineStore({
  id: 'examenes',
  state: () => ({
    examenes: JSON.parse(localStorage.getItem('examenes')) || [],
  }),
  actions: {
    crearExamen(examen) {
      examen.id = Date.now();
      this.examenes.push(examen);
      localStorage.setItem('examenes', JSON.stringify(this.examenes));
    },cambiarOrden() {
      this.ordenDescendente = !this.ordenDescendente;
    }
    
  },
  getters: {
    getExamenById: (state) => (id) => {
      return state.examenes.find(examen => examen.id === Number(id));
    },examenesOrdenados: (state) => {
      return [...state.examenes].sort((a, b) => state.ordenDescendente ? new Date(b.fecha) - new Date(a.fecha) : new Date(a.fecha) - new Date(b.fecha));
    },
  }
});
