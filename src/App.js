import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/forms`)
      .then(({ data: { data } }) => setForms(data.forms))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {forms.map((form) => (
        <div style={{ marginBottom: 20 }}>
          <p>제목: {form.title}</p>
          <p>내용: {form.content} </p>
          <p>카테고리: {form.category}</p>
        </div>
      ))}
    </>
  );
}
