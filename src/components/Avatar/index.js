import React from 'react';
import {useSelector} from 'react-redux';

import {Container, ContainerLoading} from './styles';

import profilePhotoPlaceholder from '../../assets/placeholder-profile.png';
import {TouchableOpacity, ActivityIndicator} from 'react-native';

const Avatar = ({size, action, round, mr, loading, ...rest}) => {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      {loading ? (
        <ContainerLoading size={size} mr={mr}>
          <ActivityIndicator size="large" color="#281100" />
        </ContainerLoading>
      ) : (
        <TouchableOpacity onPress={action}>
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
        </TouchableOpacity>
      )}
    </>
  );
};

export default Avatar;
