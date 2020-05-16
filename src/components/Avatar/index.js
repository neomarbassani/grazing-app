import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

import profilePhotoPlaceholder from '../../assets/placeholder-profile.png';

const Avatar = ({ size, round, mr, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const [photo, setPhoto] = useState(user.profile_photo);

  useEffect(() => {
    setPhoto(user.profile_photo);
  }, [user.profile_photo]);

  return (
    <Container
      size={size}
      mr={mr}
      {...rest}
      source={(photo && { uri: photo }) || profilePhotoPlaceholder}
    />
  );
};

export default Avatar;
