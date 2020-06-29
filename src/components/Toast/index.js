import Toast from 'react-native-tiny-toast';

const toast_error = message => {
  Toast.show(message, {
    textColor: '#fff',
    position: 50,
    containerStyle: {
      backgroundColor: '#B00020',
    },
    duration: 4000,
  });
};

const toast_success = () => {
  Toast.showSuccess('Pay success');
};

export {toast_success, toast_error};
