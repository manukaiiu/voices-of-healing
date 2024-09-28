import { ERoutes } from "@/enums/route.enums";
import { RouteComponent, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: ERoutes.PLAYER,
  },
  {
    component: (): RouteComponent => import(`@/pages/SetupPage.vue`),
    name: ERoutes.SETUP,
    path: ERoutes.SETUP,
    meta: {
      headerTitle: 'Setup v0.0.12',
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
      headerTitle: 'Voices of Healing',
      showSettingsButton: true,
      showBackButton: false,
    }
  },
];

export default routes;
