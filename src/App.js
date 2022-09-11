import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Admin from './pages/admin/Admin';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Admin /> 
      </BrowserRouter>
    </>
  )
}
