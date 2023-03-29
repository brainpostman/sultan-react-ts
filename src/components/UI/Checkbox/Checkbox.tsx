import { PropsWithChildren } from "react";

interface ICheckboxProps<T> extends PropsWithChildren {
    item: T;
    onChange: (item: T) => void;
    checked: boolean
    id: string;
    className?: string;
}

const Checkbox = <T,>({ item, onChange, checked, id, className, children }: ICheckboxProps<T>) => {
    return (
        <div className={className}>
            <label htmlFor={id}>
                <input name={id} id={id} type="checkbox" checked={checked} onChange={() => onChange(item)}/>
                {children}
            </label>
        </div>
    )
}

export default Checkbox;