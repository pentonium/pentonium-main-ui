import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";

export const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/categories/:id",
        exact: true,
        component: Categories
    }
  ];