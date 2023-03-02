import React from 'react';
import Navbar from './Navbar';
import '../styles/Layout.css';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
