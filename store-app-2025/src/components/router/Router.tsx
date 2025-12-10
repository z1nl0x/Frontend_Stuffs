import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Header } from '../shared/Header';
import { Menu } from '../shared/Menu';

const Spinner = () => <span className="loading loading-spinner loading-xl"></span>;

const Loading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-base-300">
        <Spinner />
        <p className="mt-4 text-lg text-base-content">Carregando...</p>
    </div>
);

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const HomeScreen = lazy(() => import('~/components/screens/Home'));

function Layout() {

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label 
          htmlFor="my-drawer" 
          aria-label="close sidebar" 
          className="drawer-overlay"
        />
        <Menu />
      </div>
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: 'home',
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <HomeScreen />,
            },
          ],
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div className="bg-base-300">
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};