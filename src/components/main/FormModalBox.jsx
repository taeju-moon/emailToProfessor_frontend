import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

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

const FormModalBox = (props) => {
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };
  const [form, setForm] = useState(null);

  const onClickExit = () => {
    props.setShowModal(false);
    window.history.scrollRestoration = 'auto';
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/forms/${props.id}`)
      .then(function (response) {
        // handle success
        setForm(response.data.data.form);
      })
      .catch(function (error) {
        // handle error
      });
  }, []);

  const [stars, setStars] = useState(null);

  useEffect(() => {
    setStars(form && form.stars);
  }, [form && form.stars]);

  const onClickStar = () => {
    setStars(stars + 1);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/forms/${props.id}`, {
        title: form.title,
        content: form.content,
        stars: stars + 1,
      })
      .then(function (response) {})
      .catch(function (error) {});
  };
  return (
    <>
      {form && (
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
                cursor: 'pointer',
              }}
              onClick={onClickExit}
            >
              X
            </div>
            <div style={{ width: '100%', height: '10%', marginTop: '30px', fontWeight: '600' }}>
              {form.title}
            </div>
            <div
              style={{
                width: '80%',
                margin: 'auto',
                height: '40%',
                whiteSpace: 'pre-wrap',
                overflowY: 'scroll',
              }}
            >
              {form.content}
            </div>
            <div style={{ width: '100%', height: '10%', marginTop: '30px' }}>
              양식 만든 학생 : {form.writer}
            </div>
            <div style={{ width: '100%', height: '10%', fontSize: '25px' }} onClick={onClickStar}>
              <AiFillStar style={{ color: '#9f8473' }}></AiFillStar>
              {stars}
            </div>
            <div
              style={{
                width: '60%',
                height: '10%',
                backgroundColor: '#dfd3c3',
                lineHeight: '40px',
                borderRadius: '10px',
                margin: '1% auto',
                fontSize: '20px',
              }}
              onClick={() => handleCopyClipBoard(form.content)}
            >
              본문 복사하기
            </div>
          </ModalBox>
        </>
      )}
    </>
  );
};

export default FormModalBox;
