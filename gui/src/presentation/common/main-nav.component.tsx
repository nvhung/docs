import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainNavItem, MainNavItemPath } from "./constants";

const getActiveItem = (pathname: any) => {
    for (const item in MainNavItemPath) {
        console.log(pathname, item, MainNavItemPath[item]);
        if (pathname.startsWith(MainNavItemPath[item])) {
            return item;
        }
    }
    return MainNavItem.SEARCH;
};

export const MainNav = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<any>(MainNavItem.SEARCH);

    useEffect(() => {
        console.log(location);
        setActiveItem(getActiveItem(location.pathname));
    }, [location]);

    return (
        <div className='main-nav'>
            <ul className="nav nav-underline">
            <li className="nav-item">
                <a className={`nav-link ${activeItem === MainNavItem.SEARCH ? 'active' : ''}`} href={MainNavItemPath[MainNavItem.SEARCH]}>Search</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${activeItem === MainNavItem.DOCUMENT ? 'active' : ''}`} href={MainNavItemPath[MainNavItem.DOCUMENT]}>Document</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${activeItem === MainNavItem.TAGS ? 'active' : ''}`} href={MainNavItemPath[MainNavItem.TAGS]}>Tags</a>
            </li>
            </ul>
      </div>
    );
};
