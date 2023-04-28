import React from 'react';
import { Outlet } from 'react-router-dom';

import style from './header.module.css';
import { AppHeader } from '../../components/app-header/app-header';


export const Header = () => {
  return (
    <>
      <AppHeader />
      
      <main className={style.content}>
        <Outlet />
      </main>
    </>
  );
};
