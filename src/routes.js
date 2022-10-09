import React, { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import LoadingScreen from "./component/LoadingScreen";

export const renderRoutes = (routes) => (
  <Suspense fallback={<LoadingScreen />} >
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return <Route key={i} path={route.path}  element={ <Layout>{route.routes ? renderRoutes(route.routes) : <Component  />}</Layout>} />;
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./component/Page404")),
  },
  {
    path: "*",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component:lazy(()=>import("./component/Home")) ,
      },
      {
        exact: true,
        path: "cryptodetails/:uuid",
        component: lazy(() => import("./component/CryptoDetails")),
      },
      {
        exact: true,
        path: "/allcrypto",
        component: lazy(() => import("./component/Allcrypto")),
      },
      {
        exact: true,
        path: "/news",
        component: lazy(() => import("./component/News")),
      }
    
    ],
  },
];

export default routes;
