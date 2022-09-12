import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import FormModalBox from './FormModalBox';

const FormBox = styled.div((props) => ({
  width: '250px',
  margin: '20px',
  height: '230px',
  backgroundImage: 'url(' + 'img/mail.png' + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  backgroundSize: 'cover',
  textAlign: 'center',
}));

const FormBoxes = (props) => {
  const [getFormBox, setGetFormBox] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  const onClickFormBox = (e) => {
    setId(e.currentTarget.id);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get(`${process.env.PROD_APP_API_URL}/forms`)
      .then(function (response) {
        // handle success
        console.log(response.data.data.forms);
        setGetFormBox(response.data.data.forms);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const filterGetFormBox =
    getFormBox &&
    getFormBox.filter(
      (form) =>
        form.title.toLowerCase().includes(props.searchText) ||
        form.content.toLowerCase().includes(props.searchText) ||
        form.category.name.toLowerCase().includes(props.searchText),
    );

  const ListFormBox =
    filterGetFormBox &&
    filterGetFormBox.map((form, index) => (
      <>
        <FormBox width={window.innerWidth} id={form._id} key={index} onClick={onClickFormBox}>
          <div
            style={{
              width: '100px',
              margin: 'auto',
              marginTop: '30px',
              color: '#c7b199',
              borderRadius: '5px',
              lineHeight: '30px',
              fontWeight: '600',
              justifyContent: 'center',
            }}
          >
            #{form.category.name}
          </div>
          <div style={{ lineHeight: '60px', fontWeight: '600' }}>{form.title}</div>
          <div style={{ height: '70px', whiteSpace: 'pre-wrap' }}>
            {form.content.length >= 8 ? form.content.substr(0, 8) + '...' : form.content}
          </div>
          <div style={{ lineHeight: '40px', fontSize: '25px' }}>
            <AiFillStar style={{ color: '#9f8473' }}></AiFillStar>
            {form.stars}
          </div>
        </FormBox>
      </>
    ));

  return (
    <>
      <div
        style={{
          width: '65%',
          margin: '0 auto',
          marginTop: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {ListFormBox && ListFormBox.length !== 0 ? (
          ListFormBox
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>검색 결과가 없습니다</div>
        )}
      </div>
      {showModal ? <FormModalBox setShowModal={setShowModal} id={id}></FormModalBox> : null}
    </>
  );
};

export default FormBoxes;
