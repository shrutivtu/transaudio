import React, { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

type QueryWrapperProps = {
  children: ReactNode;
};

const QueryWrapper: React.FC<QueryWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryWrapper;