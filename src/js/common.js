import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const showMessage = (type, title, message) => {
  iziToast[type]({
    title,
    message,
    timeout: 2000,
    progressBar: false,
    position: 'center'
  });
};

const errorMessage = (message, title = '') => {
  showMessage('error', title, message);
};

const successMessage = (message, title = '') => {
  showMessage('success', title, message);
};

export { errorMessage, successMessage };