import { createBrowserRouter, useRouteError } from 'react-router-dom';
import App from './App';
import { Transcript } from './pages';
import QueryWrapper from './QueryWrapper';
import { ErrorComp } from './components';

const Error = () => {
  const error:any = useRouteError();
  return <ErrorComp text={error.message} />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: 'transcripts/:transcriptId',
    element: (
      <QueryWrapper>
        <Transcript />
      </QueryWrapper>
    ),
    errorElement: <Error />
  },
]);

export default router;
