import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const HomeScreen = lazy(() => import('~/components/screens/Home'));

function Layout() {

  return (
    <div>
      <nav className="p-4 flex items-center justify-between sticky top-0 z-50 bg-cyan-900 shadow-lg">
        <span className="text-4xl font-black text-cyan-300">
          水
        </span>
      </nav>
      <Outlet />
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
    <div className="min-h-screen bg-base-300">
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};