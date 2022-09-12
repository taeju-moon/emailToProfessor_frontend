import React, { useEffect, useState } from 'react';
import SearchBox from '../../components/main/SearchBox';
import FormBoxes from '../../components/main/FormBoxes';
import CreateBar from '../../components/main/CreateBar';
import Footer from '../../components/main/Footer';

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    softRemover(); // 해당 컴포넌트가 나타나면 함수가 바로실행됨.
  }, [opacity]);

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
      <div style={{ opacity: opacity }}>
        <SearchBox searchText={searchText} setSearchText={setSearchText}></SearchBox>
        <FormBoxes searchText={searchText}></FormBoxes>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Main;
