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
  padding: '15px',
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
      .get(`${process.env.REACT_APP_API_URL}/category`)
      .then(function (response) {
        // handle success
        setCategoryList(response.data.data);
      })
      .catch(function (error) {
        // handle error
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
        .post(`${process.env.REACT_APP_API_URL}/forms`, {
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
            margin: 'auto',
            marginTop: '0px',
            marginBottom: '10px',
            textAlign: 'center',
            outline: 'none',
            fontSize: '8px',
            color: 'red',
          }}
        >
          <div>??? ??? ??? ?????? ??????/????????? ???????????????</div>
          <div>????????? ????????? ?????? ??? ?????? ??? ????????? ????????? ??? ????????????</div>
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
          placeholder="???????????? ??????"
          onChange={onChangeCategory}
        >
          <option value="none" selected disabled hidden>
            ??????????????? ???????????????
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
          placeholder="?????????"
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
          placeholder="??????"
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
          placeholder="??????"
          onChange={onChangeContent}
          value={content}
        ></textarea>
        <div
          style={{
            width: '60%',
            height: '10%',
            backgroundColor: '#dfd3c3',
            lineHeight: '43px',
            borderRadius: '10px',
            margin: '1% auto',
            fontSize: '20px',
            color: '#6c5d53',
          }}
          onClick={onClickCreate}
        >
          ?????? ????????????
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
                cursor: 'pointer',
              }}
              onClick={onClickExitAlert}
            >
              X
            </div>
          </div>
          <div>
            <img
              style={{ width: '70px', height: '70px', marginTop: '10px' }}
              src="/img/professor.png"
              alt="professor.png"
            ></img>
          </div>
          <div style={{ width: '80%', height: '60px', margin: '0px 10% 60px 10%' }}>
            ??????, ????????? ?????? ????????? ?????? ???????????????
          </div>
        </AlertModalBox>
      ) : null}
    </>
  );
};

export default CreateModalBox;
