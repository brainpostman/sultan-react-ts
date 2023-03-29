import { PropsWithChildren } from 'react';
import cl from './Breadcrumbs.module.scss';

interface IBreadcrumbsProps extends PropsWithChildren {

}

const Breadcrumbs = (props: IBreadcrumbsProps) => {
    return (<div className={cl.breadcrumbs}>
        {props.children}
    </div>);
}

export default Breadcrumbs;