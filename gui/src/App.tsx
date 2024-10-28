import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Search } from './presentation/search/search.component';
import { Tags } from './presentation/tags/tags.component';
import { Document } from './presentation/document/document.component';
import { Page } from './presentation/common/page.component';
import { MainNavItem, MainNavItemPath } from './presentation/common/constants';

const router = createBrowserRouter([
  {
    path: MainNavItemPath[MainNavItem.SEARCH],
    element: <Page renderer={() => <Search />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT],
    element: <Page renderer={() => <Document />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.TAGS],
    element: <Page renderer={() => <Tags />} />,
  },
]);

export const App = () => {
  return (
    <div>
      <header className='fs-5'>
        <label>DOCUMENTS</label>
      </header>
      <RouterProvider router={router} />
    </div>
  );
}