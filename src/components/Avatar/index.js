import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

import profilePhotoPlaceholder from '../../assets/placeholder-profile.png';

const Avatar = ({ size, round, mr, ...rest }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container
      size={size}
      mr={mr}
      {...rest}
      source={
        (user.profile_photo && {
          uri: `${user.profile_photo}?updated_at=${user.updated_at}`,
        }) ||
        profilePhotoPlaceholder
      }
    />
  );
};

export default Avatar;
