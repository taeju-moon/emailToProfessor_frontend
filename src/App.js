import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './pages/main/Main';

export default function App() {
  // const [forms, setForms] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/forms`)
  //     .then(({ data: { data } }) => setForms(data.forms))
  //     .catch((error) => console.log(error));
  // }, []);
  return (
    <>
      <Main></Main>
    </>
  );
}
