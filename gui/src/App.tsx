import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Search } from './presentation/search/search.component';
import { Tags } from './presentation/tags/tags.component';
import { Document } from './presentation/document/document.component';
import { Page } from './presentation/common/page.component';
import { MainNavItem, MainNavItemPath } from './presentation/common/constants';
import { Dashboard } from './presentation/dashboard/dashboard.component';
import { DocumentView } from './presentation/document/document-view.component';

const createRouter = () => createBrowserRouter([
  {
    path: MainNavItemPath[MainNavItem.SEARCH],
    element: <Page renderer={() => <Search />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DASHBOARD],
    element: <Page renderer={() => <Dashboard />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DASHBOARD],
    element: <Page renderer={() => <Dashboard />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DASHBOARD] + '/*',
    element: <Page renderer={() => <Dashboard />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT],
    element: <Page renderer={() => <Document />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT] + '/create',
    element: <Page renderer={() => <Document />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT] + '/:name',
    element: <Page renderer={() => <DocumentView />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.DOCUMENT] + '/:name/edit',
    element: <Page renderer={() => <Document />} />,
  },
  {
    path: MainNavItemPath[MainNavItem.TAGS],
    element: <Page renderer={() => <Tags />} />,
  },
]);

export const App = () => {
  const [router] = useState<any>(createRouter());

  useEffect(() => {
    console.log('initialize application');
  }, []);

  return (
    <>
      <header className='fs-5'>
        <label>DOCUMENTS</label>
      </header>
      {router && <RouterProvider router={router} />}
    </>
  );
}
