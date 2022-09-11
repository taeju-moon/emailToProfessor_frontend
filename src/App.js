import React from 'react';
import Main from './pages/main/Main';
import { injectGlobal } from '@emotion/css';

injectGlobal`
body{
  padding: 0;
  margin: 0;
}
`;

export default function App() {
  return (
    <>
      <Main></Main>
    </>
  );
}
