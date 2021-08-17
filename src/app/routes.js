import HomeScreen from "./HomeScreen";
import ModuleScreen from "./ModuleScreen";
import ServiceScreen from "./ServiceScreen";

import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";
import NotFoundScreen from "./NotFoundScreen";

const routes = [
  {
    name: "home",
    exact: true,
    path: "/",
    component: HomeScreen,
  },
  {
    name: "module",
    exact: true,
    path: "/service/:module",
    component: ModuleScreen,
  },
  {
    name: "service",
    exact: true,
    path: "/service/:module/:service",
    component: ServiceScreen,
  },
  {
    name: "success",
    path: "/payment/success",
    component: PaymentSuccess,
  },
  {
    name: "error",
    path: "/payment/error",
    component: PaymentError,
  },
  {
    name: "404",
    path: "*",
    component: NotFoundScreen,
  },
  // {
  //   name: "systools",
  //   exact: true,
  //   path: "/admin/systool",
  //   component: HomeScreen,
  // },
];

export default routes;
