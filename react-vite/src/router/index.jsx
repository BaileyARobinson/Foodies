import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage'
import DishDetails from '../components/DishDetails/DishDetails';
import CreateDish from '../components/CreateDish'
import UserProfile from '../components/UserProfile/UserProfile'
import UpdateDish from '../components/UpdateDish'
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/dishes/:id",
        element: <DishDetails/>

      }, 
      {
        path: "/dishes/new",
        element: <CreateDish/>
      }, 
      {
        path: "dishes/:id/update",
        element: <UpdateDish/>
      },
      {
        path: "/users/:id",
        element: <UserProfile/>
      }
    ],
  },
]);