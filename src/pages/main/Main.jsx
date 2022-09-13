import React, { useEffect, useState } from 'react';
import SearchBox from '../../components/main/SearchBox';
import FormBoxes from '../../components/main/FormBoxes';
import CreateBar from '../../components/main/CreateBar';
import Footer from '../../components/main/Footer';
import axios from 'axios';

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [opacity, setOpacity] = useState(0);
  const [count, setCount] = useState({
    copiedTime: 0,
    accessTime: 0,
  });

  useEffect(() => {
    softRemover(); // 해당 컴포넌트가 나타나면 함수가 바로실행됨.
  }, [opacity]);

  const handleAccessTime = async () => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/count/accessTime`);
    await axios.get(`${process.env.REACT_APP_API_URL}/count`).then(({ data: { data } }) =>
      setCount({
        copiedTime: data.copiedTime,
        accessTime: data.accessTime,
      }),
    );
  };

  useEffect(() => {
    handleAccessTime();
  }, []);

  function softRemover() {
    setTimeout(() => {
      setOpacity(opacity + 0.1);
    }, 100);
  }
  return (
    <>
      <CreateBar></CreateBar>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/img/main.png"
          style={{ width: '300px', height: '300px', margin: 'auto', opacity: opacity }}
          alt="main.png"
        ></img>
      </div>
      <h5 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        지금까지 복사한 양식의 개수: {count.copiedTime}, 지금까지의 접속자수: {count.accessTime}
      </h5>
      <div style={{ opacity: opacity }}>
        <SearchBox searchText={searchText} setSearchText={setSearchText}></SearchBox>
        <FormBoxes searchText={searchText}></FormBoxes>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Main;
