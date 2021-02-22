import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";
import JobDescription from './components/pages/JobDescription';
import Customer from "./components/pages/Customer";
import JobPost from "./components/pages/JobPost";
import JobEdit from "./components/pages/JobEdit";
import IPFSChat from "./controllers/IPFSChat";
import ChatPage from "./components/pages/ChatPage";
import Category from "./components/pages/Category";

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
        path: "/categories/:parentId/:categoryId",
        exact: true,
        component: Category
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
    },{
        path: "/chatpage",
        exact: true,
        component: ChatPage
    }
  ];