import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Search } from './presentation/search/search.component';
import { Tags } from './presentation/tags/tags.component';
import { Document } from './presentation/document/document.component';
import { Page } from './presentation/common/page.component';
import { MainNavItem, MainNavItemPath } from './presentation/common/constants';

const createRouter = () => createBrowserRouter([
  {
    path: MainNavItemPath[MainNavItem.SEARCH],
    element: <Page renderer={() => <Search />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT],
    element: <Page renderer={() => <Document />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT] + '/:name',
    element: <Page renderer={() => <Document />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.TAGS],
    element: <Page renderer={() => <Tags />} />,
  },
]);

export const App = () => {
  const [router] = useState<any>(createRouter());

  return (
    <div>
      <header className='fs-5'>
        <label>DOCUMENTS</label>
      </header>
      {router && <RouterProvider router={router} />}
    </div>
  );
}
