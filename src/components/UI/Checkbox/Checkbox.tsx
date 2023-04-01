import { PropsWithChildren } from 'react';

interface ICheckboxProps<T> extends PropsWithChildren {
    item: T;
    onChange: (item: T) => void;
    checked: boolean;
    className?: string;
}

const Checkbox = <T,>({
    item,
    onChange,
    checked,
    className,
    children,
}: ICheckboxProps<T>) => {
    return (
        <div className={className}>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange(item)}
                />
                {children}
            </label>
        </div>
    );
};

export default Checkbox;
