import Dashboard from "../../pages/PrivatePage/Dashboard/Index";
import List from "../../pages/PrivatePage/List/List";
import Profile from "../../pages/PrivatePage/Profile/Profile";
import RegistraionForm from "../../pages/PrivatePage/RegistrationForm/RegistraionForm";
import SearchForm from "../../pages/PrivatePage/SearchForm.js/SearchForm";
import ServiceBoard from "../../pages/PrivatePage/Services/ServiceBoard";
import ServiceForms from "../../pages/PrivatePage/Services/ServiceForm/ServiceForms";

const PrivateRoute = [
  {
    path: "/",
    exact: true,
    component: <Dashboard />,
  },
  {
    path: "/registration",
    exact: true,
    component: <RegistraionForm />,
  },
  {
    path: "/searchform",
    exact: true,
    component: <SearchForm />,
  },
  {
    path: "/services",
    exact: true,
    component: <ServiceBoard />,
  },
  {
    path: "/services/serviceform",
    exact: true,
    component: <ServiceForms />,
  },
  {
    path: "/list",
    exact: true,
    component: <List />,
  },
  {
    path: "/profile",
    exact: true,
    component: <Profile />,
  },
];

export default PrivateRoute;
