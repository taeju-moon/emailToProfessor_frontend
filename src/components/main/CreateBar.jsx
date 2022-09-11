import React, { useState } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import CreateModalBox from './CreateModalBox';

const CreateBar = () => {
  const [showModal, setShowModal] = useState(false);

  const onClickCreateBar = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: '#9f8473',
          textAlign: 'center',
          color: 'white',
          lineHeight: '40px',
          fontSize: '20px',
        }}
        onClick={onClickCreateBar}
      >
        메일 양식 만들기 &nbsp; <BsPencilFill></BsPencilFill>
      </div>
      {showModal ? <CreateModalBox setShowModal={setShowModal}></CreateModalBox> : null}
    </>
  );
};

export default CreateBar;
