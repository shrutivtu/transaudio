import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './styles/main.scss';
import { Transcript } from './pages/Transcript.tsx';
import { ErrorPage } from './components/ErrorComp.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
    // children: [
    //   {
    //     path: "transcripts/:transcriptId",
    //     element: <Transcript />,
    //   },
    // ],
  },
  {
    path: "transcripts/:transcriptId",
    element: <Transcript />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
