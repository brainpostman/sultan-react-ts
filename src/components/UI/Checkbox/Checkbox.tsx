import { PropsWithChildren } from 'react';

interface ICheckboxProps<T> extends PropsWithChildren {
    item: T;
    onChange: (item: T) => void;
    checked: boolean;
    className?: string;
}

const Checkbox = <T,>({ item, onChange, checked, className, children }: ICheckboxProps<T>) => {
    return (
        <div className={className}>
            <label
                onChange={(e) => {
                    e.stopPropagation();
                    onChange(item);
                }}>
                <input type='checkbox' checked={checked} />
                {children}
            </label>
        </div>
    );
};

export default Checkbox;
