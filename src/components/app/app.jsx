import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getCookie } from '../../utils/cookie.js';
import { getProfileInfo } from '../../services/actions/profileActions.js';
import { getIngredients } from '../../services/actions/ingredientsAction.js';
import { closeIngredientDetailsPopup } from '../../services/actions/popupActions.js';

import { ProtectedRouteElement } from '../protectedRouteElement/protectedRouteElement.jsx';
import { RouteUnauthorizedUser } from '../routeUnauthorizedUser/routeUnauthorizedUser.jsx';
import { Modal } from '../modal/modal.jsx';
import { IngredientDetails } from '../ingredient-details/ingredient-details.jsx';

import { Header } from '../../pages/header/header.jsx';
import { MainPage } from '../../pages/mainPage/mainPage.jsx';
import { LoginPage } from '../../pages/loginPage/loginPage.jsx';
import { RegisterPage } from '../../pages/registerPage/registerPage.jsx';
import { ForgotPasswordPage } from '../../pages/forgotPasswordPage/forgotPasswordPage.jsx';
import { ResetPasswordPage } from '../../pages/resetPasswordPage/resetPasswordPage.jsx';
import { ProfilePage } from '../../pages/profilePage/profilePage.jsx';
import { NotFoundPage } from '../../pages/notFoundPage/notFoundPage.jsx';
import { IngredientPage } from '../../pages/ingredientPage/ingredientPage.jsx';

export const App = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = getCookie('token');

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfileInfo(accessToken))
    }
  }, [accessToken]);

  return (
    <>
      <Routes location={location.state?.previousLocation || location}>
        <Route path='/' element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path='/not-found' element={<NotFoundPage />}/>
          <Route path='ingredients/:id' element={<IngredientPage />} />
          <Route path='/login' element={<RouteUnauthorizedUser element={<LoginPage />}/>}/>
          <Route path='/register' element={<RouteUnauthorizedUser element={<RegisterPage />}/>}/>
          <Route path='/forgot-password' element={<RouteUnauthorizedUser element={<ForgotPasswordPage />}/>}/>
          <Route path='/reset-password' element={<RouteUnauthorizedUser element={<ResetPasswordPage />} reset/>}/>
          <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />}/>}/>
        </Route>
      </Routes>

      {location.state?.previousLocation && (
        <Routes>
          <Route path='/ingredients/:id' element={
            <Modal handleClose={() => dispatch(closeIngredientDetailsPopup())}>
              <IngredientDetails />
            </Modal>} />
        </Routes>
      )}
    </>
  );
});

