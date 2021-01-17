import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";
import JobDescription from './components/pages/JobDescription';
import Customer from "./components/pages/Customer";
import JobPost from "./components/pages/JobPost";
import JobEdit from "./components/pages/JobEdit";

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
    },{
        path: "/post-job",
        exact: true,
        component: JobPost
    },{
        path: "/editdata/:hashId",
        exact: true,
        component: JobEdit
    }
  ];