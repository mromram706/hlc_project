import { defineStore } from 'pinia';

export const usePreguntasStore = defineStore({
  id: 'preguntas',
  state: () => ({
    preguntas: JSON.parse(localStorage.getItem('preguntas')) || [],
  }),
  actions: {
    agregarPregunta(pregunta) {
      pregunta.id = Date.now();
      this.preguntas.push(pregunta);
      localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    },
    eliminarPregunta(id) {
      this.preguntas = this.preguntas.filter(p => p.id !== id);
      localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    },
  },
});