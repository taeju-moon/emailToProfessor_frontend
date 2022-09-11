import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Initial = () => {
  const [opacity, setOpacity] = useState(1);
  const [visibility, setVisibility] = useState('visible');

  useEffect(() => {
    softRemover(); // 해당 컴포넌트가 나타나면 함수가 바로실행됨.
  }, [opacity]);

  const InitialBox = styled.div((props) => ({
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    opacity: props.opacity,
    zIndex: '1',
    visibility: props.visibility,
  }));

  function softRemover() {
    setTimeout(() => {
      setOpacity(opacity - 0.1);
    }, 100);
    setTimeout(() => {
      setVisibility('hidden');
    }, 1000);
  }

  return (
    <>
      <InitialBox visibility={visibility} opacity={opacity}>
        <img
          style={{ width: '30%', height: '100%', margin: 'auto 35%' }}
          src="/img/initial.png"
          alt="initial.png"
        ></img>
      </InitialBox>
    </>
  );
};

export default Initial;
