import React from 'react';
import BooksInitializer from './redux/BooksInitializer';
import MainPage from '@/ui/mainpage/MainPage';

const page: React.FC = () => {
  
  return (
    <BooksInitializer>
      <MainPage />
    </BooksInitializer>
  
  )
};

export default page