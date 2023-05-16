import React, {useEffect} from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/types/hooks';

import { getCookie } from '../../utils/cookie';
import { getProfileInfo } from '../../services/actions/profileActions';
import { getIngredients } from '../../services/actions/ingredientsAction';
import { changeIngredientPopupState, changeOrderPopupState } from '../../services/actions/popupActions';
import { ProtectedRouteElement } from '../protectedRouteElement/protectedRouteElement';
import { RouteUnauthorizedUser } from '../routeUnauthorizedUser/routeUnauthorizedUser';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Header } from '../../pages/header/header';
import { MainPage } from '../../pages/mainPage/mainPage';
import { LoginPage } from '../../pages/loginPage/loginPage';
import { RegisterPage } from '../../pages/registerPage/registerPage';
import { ForgotPasswordPage } from '../../pages/forgotPasswordPage/forgotPasswordPage';
import { ResetPasswordPage } from '../../pages/resetPasswordPage/resetPasswordPage';
import { ProfilePage } from '../../pages/profilePage/profilePage';
import { NotFoundPage } from '../../pages/notFoundPage/notFoundPage';
import { IngredientPage } from '../../pages/ingredientPage/ingredientPage';
import { FeedPage } from '../../pages/feedPage/feedPage';
import { OrdersPage } from '../../pages/ordersPage/ordersPage';
import { OrderInfoPage } from '../../pages/orderInfoPage/orderInfoPage';

export const App = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookie('token');

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(getProfileInfo());
  }, [accessToken]);

  const previousLocation =
    location.state?.previousLocationConstructor ||
    location.state?.previousLocationFeed ||
    location.state?.previousLocationOrders ||
    location;

  const handleIngredientPopupClose = () => {
    dispatch(changeIngredientPopupState(false));
    navigate(-1);
  };

  const handleOrderPopupClose = () => {
    dispatch(changeOrderPopupState(false));
    navigate(-1);
  };

  return (
    <>
      <Routes location={previousLocation}>
        <Route path='/' element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path='/not-found' element={<NotFoundPage />} />
          <Route path='ingredients/:id' element={<IngredientPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/feed/:id' element={<OrderInfoPage isUserOrder={false} />} />
          //Маршруты для неавторизованных пользователей
          <Route path='/login' element={<RouteUnauthorizedUser element={<LoginPage />} />} />
          <Route path='/register' element={<RouteUnauthorizedUser element={<RegisterPage />} />} />
          <Route
            path='/forgot-password'
            element={<RouteUnauthorizedUser element={<ForgotPasswordPage />} />}
          />
          <Route
            path='/reset-password'
            element={<RouteUnauthorizedUser element={<ResetPasswordPage />} />}
          />
          //Маршруты для авторизованных пользователей
          <Route path='/profile/' element={<ProtectedRouteElement element={<ProfilePage />} />}>
            <Route path='orders/' element={<OrdersPage />}></Route>
          </Route>
          <Route path='/profile/orders/:id' element={<OrderInfoPage isUserOrder={true} />} />
        </Route>
      </Routes>

      {location.state?.previousLocationConstructor && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal handleClose={() => handleIngredientPopupClose()}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {location.state?.previousLocationFeed && (
        <Routes>
          <Route
            path='/feed/:id'
            element={
              <Modal handleClose={() => handleOrderPopupClose()}>
                <OrderInfoPage isUserOrder={false} />
              </Modal>
            }
          />
        </Routes>
      )}

      {location.state?.previousLocationOrders && (
        <Routes>
          <Route
            path='/profile/orders/:id'
            element={
              <Modal handleClose={() => handleOrderPopupClose()}>
                <OrderInfoPage isUserOrder={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
});