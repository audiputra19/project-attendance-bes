import { createContext, FC, ReactNode, useContext, useState } from "react";
import Modal from "../Components/Modal";

type ModalContextType = {
    isOpen: boolean;
    message: string;
    title: string;
    onConfirm: () => void;
    openModal: (message: string, title: string, onConfirm: () => void) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);
export const ModalProvider:FC<{children: ReactNode}> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

    const openModal = (message: string, title: string, onConfirm: () => void = () => {}) => {
        setMessage(message);
        setTitle(title);
        setOnConfirm(() => onConfirm);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setMessage('');
        setTitle('');
        setOnConfirm(() => {});
    }

    return (
        <ModalContext.Provider value={{isOpen, message, title, onConfirm, openModal, closeModal}}>
            {children}
            {isOpen && <Modal />}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}