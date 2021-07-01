// import loadable from "@loadable/component";

import HomeScreen from "./HomeScreen";
import PartnerListScreen from "./PartnerListScreen";
import PartnerScreen from "./PartnerScreen";
import PartnerServiceScreen from "./PartnerServiceScreen";

import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";
import NotFoundScreen from "./NotFoundScreen";

// const HomeScreen = loadable(() => import("./app/HomeScreen"))
// const PartnerListScreen = loadable(() => import("./app/PartnerListScreen"))
// const PartnerScreen = loadable(() => import("./app/PartnerScreen"))
// const PartnerServiceScreen = loadable(() => import("./app/PartnerServiceScreen"))
// const PaymentSuccess = loadable(() => import("./app/PaymentSuccess"))
// const PaymentError = loadable(() => import("./app/PaymentError"))
// const NotFoundScreen = loadable(() => import("./app/NotFoundScreen"))

const routes = [
  {
    name: "home",
    exact: true,
    path: "/",
    component: HomeScreen,
  },
  {
    name: "partners",
    path: "/partners",
    component: PartnerListScreen,
  },
  {
    name: "services",
    path: "/partner/:partnerId/services",
    component: PartnerScreen,
  },
  {
    name: "service",
    path: "/partner/:partnerId/:module/:service",
    component: PartnerServiceScreen,
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
