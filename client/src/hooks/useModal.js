import {useState} from "react";

export const useModal = () => {
  const [modal, setModal] = useState({isShowing: false, element: null, style: {}});

  const toggleModal = (element = null, open = false, style = {}) => {
    setModal({
      isShowing: open,
      element,
      style,
    });
  }

  return {
    modal,
    toggleModal,
  }
};
