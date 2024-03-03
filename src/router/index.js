import { createRouter, createWebHistory } from "vue-router";
import { useSesionStore } from "@/store/sesion";
import UsuarioFormulario from '@/components/UsuarioFormulario.vue';
import ListarCategoriasView from '@/views/ListarCategoriasView.vue';
import ListarPreguntasView from '@/views/ListarPreguntasView.vue';
import ListarExamenesView from '@/views/ListarExamenesView.vue';
import ListarUsuariosView from '@/views/ListarUsuariosView.vue';
import FormularioExamenView from '@/views/FormularioExamenView.vue';
import ExamenView from '@/views/ExamenView.vue';
import EditarCategoriaView from '../views/EditarCategoriaView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
          {
            path: '/listar-usuarios',
            name: 'ListarUsuarios',
            component: ListarUsuariosView,
          },{
            path: '/usuario/:id?',
            name: 'UsuarioFormulario',
            component: UsuarioFormulario,
            props: true,
        },{
          path: '/categorias',
          name: 'Categorias',
          component: ListarCategoriasView,
        },
        {
          path: '/preguntas',
          name: 'Preguntas',
          component: ListarPreguntasView,
        },
        {
          path: '/examenes',
          name: 'Examenes',
          component: ListarExamenesView,
        },{
          path: '/crear-examen',
          name: 'CrearExamen',
          component: FormularioExamenView,
      },
      {
          path: '/examen/:id',
          name: 'Examen',
          component: ExamenView,
      },{
        path: '/categorias/editar/:id',
        name: 'EditarCategoria',
        component: EditarCategoriaView,
      },
    ],
});
router.beforeEach((to, from, next) => {
    const sesionStore = useSesionStore();
    
    sesionStore.recuperarSesion();
  
    if (sesionStore.usuario && to.name === 'login') {
      next({ name: 'home' });
    } else {
      next();
    }
  });

export default router;
