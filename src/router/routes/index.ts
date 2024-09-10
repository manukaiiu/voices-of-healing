import { ERoutes } from "@/enums/route.enums";
import { RouteComponent, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: ERoutes.PLAYER,
  },
  {
    component: (): RouteComponent => import(`@/pages/SettingsPage.vue`),
    name: ERoutes.SETTINGS,
    path: ERoutes.SETTINGS,
    meta: {
      headerTitle: 'Settings',
      showSettingsButton: false,
      showBackButton: true,
      backRoute: ERoutes.PLAYER,
    }
  },
  {
    component: (): RouteComponent => import(`@/pages/AudioPlayerPage.vue`),
    name: ERoutes.PLAYER,
    path: ERoutes.PLAYER,
    meta: {
      headerTitle: 'Selfcompassion',
      showSettingsButton: true,
      showBackButton: false,
    }
  },
];

export default routes;
