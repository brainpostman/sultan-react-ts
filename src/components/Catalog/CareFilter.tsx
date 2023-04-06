import { ICareFilter } from '../../types/catalogItem';

interface ICareFilterProps {
    filter: ICareFilter;
    onClick: (type: string) => void;
    className?: string;
    activeClass?: string;
}

const CareFilter = ({ filter, onClick, className, activeClass }: ICareFilterProps) => {
    return (
        <div className={`${className} ${activeClass}`} onClick={() => onClick(filter.type)}>
            {filter.value}
        </div>
    );
};

export default CareFilter;
