import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

import Root from './pages/Root.jsx';
import NotFound from './pages/NotFound.jsx';
import School from './pages/School.jsx';
import About from './pages/About.jsx';
import RequestSchool from './pages/RequestSchool';
import Course from './pages/Course';
import Review from './pages/Review';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'request-school', element: <RequestSchool /> },
      {
        path: 'schools/:schoolId',
        element: <School />,
        children: [
          {
            path: 'courses/:courseId',
            element: <Course />,
            children: [
              {
                path: 'review',
                element: <Review />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
