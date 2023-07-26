import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Block from 'components/Main/Block';
import Nav from 'components/Main/Nav';

import 'styles/Editor/Editor.css';

const Editor = ({ isLoading, setIsLoading }) => {
  const { idx } = useParams();
  console.log(idx);

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} />
      <Block />
    </>
  );
};

export default Editor;
