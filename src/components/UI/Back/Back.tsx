import { useNavigate } from 'react-router-dom';
import cl from './Back.module.scss';

interface IBackProps {
    className?: string;
}

const Back = ({ className }: IBackProps) => {
    const navigate = useNavigate();

    return (
        <div
            className={`${cl.goback} ${className}`}
            onClick={() => navigate(-1)}
        >
            <div className={cl.goback__icon}>
                <div></div>
            </div>
            <span className={cl.goback__text}>НАЗАД</span>
        </div>
    );
};

export default Back;
