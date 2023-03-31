import { PropsWithChildren } from 'react';
import cl from './Modal.module.scss';

interface IModalProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
}

const Modal = ({ className, children, onClick }: IModalProps) => {
    return (
        <div
            onClick={(event) => {
                event.stopPropagation();
                if (onClick) onClick();
            }}
            className={`${className ?? ''} ${cl.modalbackground}`}
        >
            {children}
        </div>
    );
};

export default Modal;
