import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      }
    };
  });

  return createPortal(
    <dialog className='cart' ref={dialog}>
      {children}
      <button onClick={() => dialog.current.close()} className='button'>
        Close Cart
      </button>
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
