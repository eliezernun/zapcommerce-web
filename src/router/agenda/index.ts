import { userStore } from "@/store/user";
import { SubModulosAgenda } from "@/types/enums/agenda/SubModulosAgenda";
import { Route } from "@/types/router/route";

const agendaRoutes: Route[] = [
  {
    text: 'Início',
    path: '/agenda',
    icon: 'mdi-home-city',
    modulo: SubModulosAgenda.GERAL,
    index: 1
  },
  {
    text: 'Meu Perfil',
    path: '/profile',
    icon: 'mdi-face-man-profile',
    modulo: SubModulosAgenda.GERAL,
    index:2
  },
  {
    text: 'Agenda',
    path: '/agenda/agendamentos',
    icon: 'mdi mdi-calendar-month',
    modulo: SubModulosAgenda.CLIENTES,
    index: 4
  },
  {
    text: 'Clientes',
    path: '/agenda/clientes',
    icon: 'mdi-account-group-outline',
    modulo: SubModulosAgenda.CLIENTES,
    index: 4
  },
  {
    text: 'Colaboradores',
    path: '/agenda/colaboradores',
    icon: 'mdi-account-multiple',
    modulo: SubModulosAgenda.PESSOAS,
    index: 5
  },
  {
    text: 'Usuarios',
    path: '/agenda/usuarios',
    icon: 'mdi-badge-account',
    modulo: SubModulosAgenda.USUARIOS,
    index: 6
  },
];

export const AgendaLinksNavegacao = () => {
  const userPermicoes = userStore().getPermicoes();
  const filteredRoutes: Route[] = [];
  console.info(userPermicoes)

  if (userPermicoes) {
    agendaRoutes.forEach((route) => {
      userPermicoes.forEach((permicao) => {
        if (permicao.permicao_modulo === route.modulo) {
          filteredRoutes.push(route);
        }
      });
    });
  }

  agendaRoutes.forEach((route) => {
    if (route.modulo === SubModulosAgenda.GERAL && !filteredRoutes.includes(route)) {
      filteredRoutes.push(route);
    }
  });

  filteredRoutes.sort((a, b) => a.index - b.index);

  return filteredRoutes;
};