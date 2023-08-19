import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import { LoaderProps } from '../types';

export const Loader: React.FC<LoaderProps> = ({ isLoading, color, overrideProp }) => {
  return (
    <HashLoader
      color= {color}
      loading={isLoading}
      cssOverride={overrideProp}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};