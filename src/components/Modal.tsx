import React from "react"

interface ModalProps {
  children: React.ReactElement,
  visible: boolean
}



const Modal: React.FC<ModalProps> = ({ children, visible }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center ease-in-out duration-300 
        ${visible ? 'opacity-100 visible' : 'opacity-0 invisible duration-400'}
      `}

    >
      {children}
    </div>
  )
}

export default Modal