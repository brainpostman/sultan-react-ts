import ISortSelect from '../../../types/sortSelect';
import cl from './Select.module.scss';

interface ISelectProps {
    options: ISortSelect[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    arrowSrc?: string;
}

const Select = ({ options, value, onChange, className }: ISelectProps) => {
    return (
        <div className={`${className} ${cl.container}`}>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className={cl.select}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <div className={cl.arrow}></div>
        </div>
    );
};

export default Select;
