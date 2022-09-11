import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { GoSearch } from 'react-icons/go';
import axios from 'axios';

const SearchInput = styled.input`
  width: 100%;
  height: 16%;
  backgroundcolor: white;
  border: 3px solid #9f8473;
  margin-top: 3%;
  padding: 10px;
  border-radius: 10px;
  outline: none;
  font-size: 25px;
  text-align: center;
`;

const SearchBox = (props) => {
  useEffect(() => {
    axios
      .get('http://3.35.11.39:8000/category')
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const [justSearch, setJustSearch] = useState('');

  const onKeyPressSearchInput = (e) => {
    if (e.key === 'Enter') {
      props.setSearchText(e.target.value);
    }
  };

  const onClickSearch = (e) => {
    props.setSearchText(justSearch);
  };

  const onChangeSearchInput = (e) => {
    if (e.target.value === '') {
      props.setSearchText(e.target.value);
    }
    setJustSearch(e.target.value);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '30%',
          marginTop: '3%',
          fontSize: '18px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        자네는 현재 어떤 상황에 처해 있는가?
      </div>
      <div style={{ position: 'relative', width: '65%', margin: '0 17.5%' }}>
        <SearchInput
          placeholder="ex. 증원, 과제, 성적, 출결, ..."
          onKeyPress={onKeyPressSearchInput}
          onChange={onChangeSearchInput}
        ></SearchInput>
        <GoSearch
          style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            color: '#9f8473',
            bottom: '15%',
            right: '-10px',
            fontSize: '30px',
          }}
          onClick={onClickSearch}
        ></GoSearch>
      </div>
    </>
  );
};

export default SearchBox;
