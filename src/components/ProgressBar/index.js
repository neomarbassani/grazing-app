import React from 'react';

import {Container, Progress} from './styles';

const ProgressBar = ({size}) => {
  return (
    <Container>
      <Progress size={size} />
    </Container>
  );
};

export default ProgressBar;
