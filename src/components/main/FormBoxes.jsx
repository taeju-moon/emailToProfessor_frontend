import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import FormModalBox from './FormModalBox';
import Pagination from '@mui/material/Pagination';

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
      .get(`${process.env.REACT_APP_API_URL}/forms`)
      .then(function (response) {
        // handle success
        setGetFormBox(response.data.data.forms);
      })
      .catch(function (error) {
        // handle error
      });
  }, []);

  const filterGetFormBox =
    getFormBox &&
    getFormBox.filter(
      (form) =>
        form.title.toLowerCase().includes(props.searchText) ||
        form.content.toLowerCase().includes(props.searchText) ||
        form.category.name.toLowerCase().includes(props.searchText) ||
        form.writer.toLowerCase().includes(props.searchText),
    );

  const [page, setPage] = useState(1);

  const ListFormBox =
    filterGetFormBox &&
    filterGetFormBox.map((form, index) => (
      <div key={index}>
        <FormBox width={window.innerWidth} id={form._id} onClick={onClickFormBox}>
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
      </div>
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
          alignItems: 'flex-start',
        }}
      >
        {ListFormBox && ListFormBox.length !== 0 ? (
          ListFormBox.reverse().slice((page - 1) * 9, page * 9)
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>검색 결과가 없습니다</div>
        )}
      </div>
      {showModal ? <FormModalBox setShowModal={setShowModal} id={id}></FormModalBox> : null}
      <Pagination
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '60px' }}
        count={Math.ceil(ListFormBox && ListFormBox.length / 9)}
        variant="outlined"
        shape="rounded"
        defaultPage={1}
        hideNextButton={true}
        hidePrevButton={true}
        onChange={(e) => {
          setPage(e.target.outerText);
          window.scrollTo(0, 250);
        }}
      />
    </>
  );
};

export default FormBoxes;
