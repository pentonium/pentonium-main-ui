import Home from "./components/pages/Home";
import JobList from "./components/pages/JobList";
import JobDescription from './components/pages/JobDescription';
import CustomerJobList from "./components/pages/CustomerJobList";
import JobPost from "./components/pages/JobPost";
import JobEdit from "./components/pages/JobEdit";
import ChatPage from "./components/pages/ChatPage";
import CategoryList from "./components/pages/CategoryList";
import OrderList from "./components/pages/OrderList";
import NotFound from "./components/pages/NotFound";

export const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/list/:id",
        exact: true,
        component: JobList
    },
    {
        path: "/categories",
        exact: true,
        component: CategoryList
    },
    {
        path: "/list/:jobId/:offerContract",
        exact: true,
        component: JobDescription
    },{
        path: "/customers/:customerId",
        exact: true,
        component: CustomerJobList
    },{
        path: "/post-job",
        exact: true,
        component: JobPost
    },{
        path: "/editdata/:jobId/:offerContract",
        exact: true,
        component: JobEdit
    },{
        path: "/chatpage/buyer/:orderContract",
        exact: true,
        component: ChatPage
    },{
        path: "/chatpage/seller/:orderContract",
        exact: true,
        component: ChatPage
    },{
        path:'/order/seller',
        exact:true,
        component:OrderList
    },{
        path:'/order/buyer',
        exact:true,
        component:OrderList
    },{
        path:'**',
        component:NotFound
    }
  ];