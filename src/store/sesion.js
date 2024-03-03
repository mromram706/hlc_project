import { defineStore } from 'pinia';

export const useSesionStore = defineStore({
  id: 'sesion',
  state: () => ({
    user: null,
  }),getters: {
    isUserLoggedIn: (state) => !!state.usuario,
  },actions: {
    setUser(usuario) {
      this.usuario = usuario;
      localStorage.setItem('sesion', JSON.stringify(usuario));
    },
    clearUser() {
      this.usuario = null;
      localStorage.removeItem('sesion');
    },
    recuperarSesion() {
      const sesion = localStorage.getItem('sesion');
      if (sesion) {
        this.usuario = JSON.parse(sesion);
      }
    },
  },
});