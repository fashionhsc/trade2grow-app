import Toast from 'react-native-toast-message';

const showSuccessToast = (message = 'Operation successful', title = 'Success') => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

const showErrorToast = (message = 'Something went wrong', title = 'Error') => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};

const showInfoToast = (message = 'Here is some info', title = 'Info') => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
  });
};

export { showSuccessToast, showErrorToast, showInfoToast };
