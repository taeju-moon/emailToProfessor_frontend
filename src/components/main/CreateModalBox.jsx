import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const ModalBox = styled.div((props) => ({
  width: '50%',
  height: '60%',
  backgroundColor: 'white',
  textAlign: 'center',
  position: 'fixed',
  top: '25%',
  left: '25%',
  zIndex: '10',
  overflow: 'scroll-y',
  borderRadius: '15px',
  border: 'solid #dfd3c3',
  padding: '10px',
}));

const AlertModalBox = styled.div((props) => ({
  width: '30%',
  height: '30%',
  backgroundColor: 'white',
  textAlign: 'center',
  position: 'fixed',
  top: '35%',
  left: '35%',
  zIndex: '20',
  overflow: 'scroll-y',
  borderRadius: '15px',
  border: 'solid #dfd3c3',
}));

const CreateModalBox = (props) => {
  const [categoryList, setCategoryList] = useState(null);
  useEffect(() => {
    axios
      .get('http://3.35.11.39:8000/category')
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setCategoryList(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const onClickExit = () => {
    props.setShowModal(false);
  };

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const [showAlertBox, setShowAlertBox] = useState(false);

  const onClickExitAlert = () => {
    setShowAlertBox(false);
  };

  const onClickCreate = () => {
    if (writer === '' || title === '' || content === '' || category === '') {
      setShowAlertBox(true);
    } else {
      console.log(category);
      axios
        .post('http://3.35.11.39:8000/forms', {
          title: title,
          content: content,
          writer: writer,
          category: category,
        })
        .then(function (response) {
          console.log(response);
          props.setShowModal(false);
          window.location.replace('/');
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
  };
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '-50%',
          width: '100%',
          height: '200%',
          backgroundColor: '#a0a0a0',
          opacity: '0.5',
          zIndex: '10',
        }}
      ></div>
      <ModalBox>
        <div style={{ width: '100%', height: '30px', position: 'relative' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: '#dfd3c3',
              textAlign: 'center',
              position: 'absolute',
              right: '5px',
              top: '5px',
              lineHeight: '30px',
              borderRadius: '100%',
              color: 'white',
            }}
            onClick={onClickExit}
          >
            X
          </div>
        </div>

        <div
          style={{
            width: '80%',
            height: '5%',
            margin: 'auto',
            marginTop: '10px',
            textAlign: 'center',
            outline: 'none',
            fontSize: '15px',
          }}
        >
          카테고리 선택
        </div>
        <select
          name="category"
          style={{
            width: '80.8%',
            height: '6%',
            margin: '3px auto',
            border: 'solid 1px #a0a0a0',
            textAlign: 'center',
            outline: 'none',
            fontSize: '15px',
          }}
          placeholder="카테고리 선택"
          onChange={onChangeCategory}
        >
          <option value="none" selected disabled hidden>
            카테고리를 선택하세요
          </option>
          {categoryList &&
            categoryList.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
        </select>
        <input
          style={{
            width: '80%',
            height: '5%',
            margin: '3px auto',
            border: 'solid 1px #a0a0a0',
            textAlign: 'center',
            outline: 'none',
            fontSize: '15px',
          }}
          placeholder="글쓴이"
          onChange={onChangeWriter}
          value={writer}
        ></input>
        <input
          style={{
            width: '80%',
            height: '5%',
            margin: '3px auto',
            marginTop: '10px',
            border: 'solid 1px #a0a0a0',
            textAlign: 'center',
            outline: 'none',
            fontSize: '15px',
          }}
          placeholder="제목"
          onChange={onChangeTitle}
          value={title}
        ></input>
        <textarea
          style={{
            width: '78%',
            height: '35%',
            margin: 'auto',
            marginTop: '10px',
            border: 'solid 1px #a0a0a0',
            textAlign: 'center',
            outline: 'none',
            fontSize: '18px',
            padding: '10px',
            overflowY: 'scroll',
          }}
          placeholder="내용"
          onChange={onChangeContent}
          value={content}
        ></textarea>
        <div
          style={{
            width: '60%',
            height: '10%',
            backgroundColor: '#dfd3c3',
            lineHeight: '40px',
            fontSize: '25px',
            borderRadius: '10px',
            margin: '1% auto',
            fontSize: '20px',
          }}
          onClick={onClickCreate}
        >
          양식 생성하기
        </div>
      </ModalBox>
      {showAlertBox ? (
        <AlertModalBox>
          <div style={{ width: '100%', height: '30px', position: 'relative' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#dfd3c3',
                textAlign: 'center',
                position: 'absolute',
                right: '5px',
                top: '5px',
                lineHeight: '30px',
                borderRadius: '100%',
                color: 'white',
              }}
              onClick={onClickExitAlert}
            >
              X
            </div>
          </div>
          <div style={{ width: '80%', height: '60px', margin: '60px 10%' }}>
            학생, 양식을 모두 채우고 다시 제출하도록
          </div>
        </AlertModalBox>
      ) : null}
    </>
  );
};

export default CreateModalBox;
