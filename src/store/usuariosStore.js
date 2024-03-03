import { defineStore } from 'pinia';
import { useSesionStore } from '@/store/sesion';

export const useUsuariosStore = defineStore({
  id: 'usuarios',
  state: () => ({
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || []
  }),
  actions: {
    
    obtenerUsuario(id) {
      return this.usuarios.find((usuario) => usuario.id === id);
    },
    async cargarUsuarios() {
      if (this.usuarios.length === 0) {
        const response = await fetch('/public/datos.json');
        const data = await response.json();
        this.usuarios = data;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      }
    },
    async agregarUsuario(usuario) {
      usuario.id = Date.now();
      this.usuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    },
    async actualizarUsuario(id, datosActualizados) {
      const usuario = this.obtenerUsuario(id);
      if (usuario) {
        Object.assign(usuario, datosActualizados);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    
        const sesionStore = useSesionStore();
        if (sesionStore.usuario && sesionStore.usuario.id === id) {
          sesionStore.setUser({...usuario});
        }
      }
    },
    async eliminarUsuario(id) {
      this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }
});
