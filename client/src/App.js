import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authactions';
import {
  BrowserRouter as Router,
  Routes, // Updated name
  Route,
  Navigate
} from 'react-router-dom';
// import AppNavbar from './components/navbar';
import PageLogin from './pages/PageLogin/PageLogin';
import PageHome from './pages/PageHome/PageHome';
import PageRegister from './pages/PageRegister/PageRegister';
import Header from './components/Header';
import PageSelectMentor from './pages/PageSelectMentor/PageSelectMentor';
import PageCheckout from './pages/PageCheckout/PageCheckout';
import PageHistory from './pages/PageHistory/PageHistory';
import PageProfile from './pages/PageProfile/PageProfile';
import PageRequestMentor from './pages/PageRequestMentor/PageRequestMentor';
import PageManageUsers from './pages/admin/PageManageUsers/PageManageUsers';
import PageManageOrders from './pages/admin/PageManageOrders/PageManageOrders';
import PageManageSubjects from './pages/admin/PageManageSubjects/PageManageSubjects';
import PageManageItems from './pages/admin/PageManageItems/PageManageItems';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    store.dispatch(loadUser());

    if (!store.getState().auth) {
      setIsAuth(false);
    }

    if (store.getState().auth.isAuth) {
      setIsAuth(true);
    }

    store.subscribe(() => {
      if (store.getState().auth.isAuth) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* {isAuth && <AppNavbar />} */}
        {isAuth && <Header />}
        <Routes>
          <Route path='/login' element={<PageLogin />} />
          <Route path='/register' element={<PageRegister />} />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <PageHome />
              </PrivateRoute>
            }
          />
          <Route
            path='/:subjectName/mentors'
            element={
              <PrivateRoute>
                <PageSelectMentor />
              </PrivateRoute>
            }
          />
          <Route
            path='/:subjectName/mentors/:itemId/checkout'
            element={
              <PrivateRoute>
                <PageCheckout />
              </PrivateRoute>
            }
          />
          <Route
            path='/history'
            element={
              <PrivateRoute>
                <PageHistory />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile/:studentId'
            element={
              <PrivateRoute>
                <PageProfile />
              </PrivateRoute>
            }
          />
          <Route
            path='/request-mentor'
            element={
              <PrivateRoute>
                <PageRequestMentor />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/users'
            element={
              <PrivateRoute>
                <PageManageUsers />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/orders'
            element={
              <PrivateRoute>
                <PageManageOrders />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/subjects'
            element={
              <PrivateRoute>
                <PageManageSubjects />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/items'
            element={
              <PrivateRoute>
                <PageManageItems />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

const PrivateRoute = ({ children }) => {
  // Accept children as props
  return store.getState().auth.isAuth ? (
    children
  ) : (
    <Navigate to='/login' replace /> // Add 'replace' to the Navigate prop
  );
};

export default App;
