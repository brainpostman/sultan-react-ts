import { observer } from 'mobx-react-lite';

interface ListProps<T> {
    items: T[];
    className?: string;
    renderItem: (item: T) => React.ReactNode;
}

const List = observer(<T,>({ items, className, renderItem }: ListProps<T>) => {
    return <div className={className}>{items && items.map(renderItem)}</div>;
});

export default List;
