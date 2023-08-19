import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorPage } from './components';
import { Transcript } from './pages';
import QueryWrapper from './QueryWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'transcripts/:transcriptId',
    element: (
      <QueryWrapper>
        <Transcript />
      </QueryWrapper>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
