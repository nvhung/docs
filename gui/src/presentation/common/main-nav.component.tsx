import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainNavItem, MainNavItemPath } from "./constants";

const getActiveItem = (pathname: any) => {
    for (const item in MainNavItemPath) {
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
        setActiveItem(getActiveItem(location.pathname));
    }, [location, activeItem]);

    return (
        <div className='main-nav'>
            <ul className="nav nav-underline">
            <li className="nav-item">
                <a className={`nav-link ${activeItem === MainNavItem.SEARCH ? 'active' : ''}`} href={MainNavItemPath[MainNavItem.SEARCH]}>Search</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${activeItem === MainNavItem.DASHBOARD ? 'active' : ''}`} href={MainNavItemPath[MainNavItem.DASHBOARD]}>Dashboard</a>
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
