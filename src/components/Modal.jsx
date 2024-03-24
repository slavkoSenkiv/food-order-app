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
    <dialog ref={dialog} className='modal'>
      <div className='modal-actions'>
        <button onClick={() => dialog.current.close()} className='text-button'>
          X
        </button>
      </div>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
