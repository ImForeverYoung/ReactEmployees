import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import { ConfigProvider, theme } from 'antd';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from './paths';
import Login from './pages/login';
import Register from './pages/register';
import { Auth } from './features/auth/auth';
import { Employees } from './pages/employees';
import { AddEmployee } from './pages/add-employee';
import { Status } from './pages/status';
import { Employee } from './pages/employee';
import { EditEmployee } from './pages/edit-employee';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },

  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
  {
    path: '/*',
    element: <Navigate to="/" />,
    // element: <div>Page 404</div>
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
