import { ERoutes } from "@/enums/route.enums";
import { RouteComponent, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    children: [
      {
        component: (): RouteComponent => import(`@/pages/SettingsPage.vue`),
        name: ERoutes.SETTINGS,
        path: ERoutes.SETTINGS,
      },
      {
        component: (): RouteComponent => import(`@/pages/AudioPlayerPage.vue`),
        name: ERoutes.PLAYER,
        path: ERoutes.PLAYER,
      },
    ],
    component: (): RouteComponent => import(`@/layouts/MainLayout.vue`),
    path: `/`,
  },
];

export default routes;
