import logo from './logo.svg';
import './App.css';

import RegisterReactBootstrap from './RegisterReactBootstrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main ';
import LoginBootstrap from './LoginBootstrap';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Main>0</Main>,
    children: [
      {
        path:'/',
        element:<RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path:'/register',
        element:<RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path:'/login',
        element:<LoginBootstrap></LoginBootstrap>
      },
    ]
  }
])

function App() {
  return (
    <div className="">
     <RouterProvider router={router}></RouterProvider>
    
    </div>
  );
}

export default App;
