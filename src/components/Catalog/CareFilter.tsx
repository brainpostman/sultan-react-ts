import { ICareFilter } from '../../types/catalogItem';

interface ICareFilterProps {
    filter: ICareFilter;
    onClick: (type: string) => void;
    className?: string;
    active?: string;
}

const CareFilter = ({
    filter,
    onClick,
    className,
    active,
}: ICareFilterProps) => {
    const activeClass = filter.checked ? `${active} ` : '';

    return (
        <div
            className={`${activeClass}${className}`}
            onClick={() => onClick(filter.type)}
        >
            {filter.value}
        </div>
    );
};

export default CareFilter;
