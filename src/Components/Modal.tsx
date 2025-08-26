import { CircleX, DoorOpen } from 'lucide-react';
import React from 'react';
import { useModal } from '../Context/ModalContext';

const Modal: React.FC = () => {
  const { isOpen, message, title, onConfirm, closeModal } = useModal();
  let icon;
  let color;  
  switch (title) {
    case 'Logout':
        icon = <DoorOpen size={54} className='text-white'/>
        color = 'red'
        break;
  
    default:
        break;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-full m-5 p-5 rounded-3xl shadow-md lg:w-1/3">
        <div 
            className='mb-3 flex justify-end'
            onClick={closeModal}
        >
            <CircleX size={32} className='text-gray-500 dark:text-gray-400 cursor-pointer'/>
        </div>
        <div className='flex flex-col items-center'>
            <div className={`bg-${color}-500 w-24 h-24 rounded-full flex items-center justify-center`}>
                {icon}
            </div>
            <p className='font-semibold text-2xl mt-5 text-black'>{title}</p>
            <p className='mt-2 text-gray-500'>{message}</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            className={`px-4 py-3 bg-color-base font-bold w-full text-white rounded-2xl`}
            onClick={() => {
              onConfirm();
              closeModal();
            }}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
