import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NotificationBell from './NotificationBell';

export default function PublicLayout() {
  return (
    <>
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
}

