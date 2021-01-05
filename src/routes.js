import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";
import JobDescription from './components/pages/JobDescription';
import Customer from "./components/pages/Customer";

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
    },
    {
        path: "/jobs/:jobId",
        exact: true,
        component: JobDescription
    },{
        path: "/customers/:customerId",
        exact: true,
        component: Customer
    }
  ];