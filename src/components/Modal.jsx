import { useRef } from 'react';
export default function Modal({ children, open}) {
  const modal = useRef();
  open ? modal.current.open();

  return <aside ref={modal}>{children}</aside>;
}
