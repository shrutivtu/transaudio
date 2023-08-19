import React from 'react';
import { HashLoader, FadeLoader } from "react-spinners";
import { LoaderProps } from '../types';


export const BufferLoader: React.FC<{ bufferingStyle: object, color: string }> = ({ bufferingStyle, color }) => {
  return (
    <FadeLoader 
      width={16} 
      color={color}
      cssOverride={bufferingStyle} 
    />
  );
};

export const PageLoader: React.FC<LoaderProps> = ({ isLoading, color, overrideProp }) => {
  return (
    <HashLoader
      color={color}
      loading={isLoading}
      cssOverride={overrideProp}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};