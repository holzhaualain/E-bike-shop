import {environment} from '../../environments/environment';

export const backendUrls: {
  root: string;
  article: string; articles: string; articlesLatest: string;
  user: string; users: string;
  shoppingBasket: string;
  order: string; orders: string; ordersUser: string;
  signInUser: string; signOutUser: string;
  createUser: string; createShoppingBasket: string; createOrder: string;
  deleteUser: string; deleteOrder: string
  addItemShoppingBasket: string; removeItemShoppingBasket: string;
  updateUser: string; updateOrder: string; updateOrderState: string; updateOrderDeliveryAddress: string;
  updateOrderContactData: string; updateOrderDeliveryType: string; updateOrderPaymentType: string;
  changeRatingArticle: string;
  changeItemAmountShoppingBasket: string;
} = {
  root: environment.backendUrl,
  // GET
  article: environment.backendUrl + 'backend/article/',
  articles: environment.backendUrl + 'backend/articles/',
  articlesLatest: environment.backendUrl + 'backend/articles/latest',
  user: environment.backendUrl + 'backend/user/',
  users: environment.backendUrl + 'backend/users/',
  shoppingBasket: environment.backendUrl + 'backend/shopping-basket/',
  order: environment.backendUrl + 'backend/order/',
  orders: environment.backendUrl + 'backend/orders/',
  ordersUser: environment.backendUrl + 'backend/orders/user',
  // POST
  signInUser: environment.backendUrl + 'backend/sign-in/user',
  signOutUser: environment.backendUrl + 'backend/sign-out/user',
  createUser: environment.backendUrl + 'backend/create/user',
  createShoppingBasket: environment.backendUrl + 'backend/create/shopping-basket',
  createOrder: environment.backendUrl + 'backend/create/order',
  deleteUser: environment.backendUrl + 'backend/delete/user',
  deleteOrder: environment.backendUrl + 'backend/delete/order',
  addItemShoppingBasket: environment.backendUrl + 'backend/add-item/shopping-basket',
  removeItemShoppingBasket: environment.backendUrl + 'backend/remove-item/shopping-basket',
  // PUT
  updateUser: environment.backendUrl + 'backend/update/user',
  updateOrder: environment.backendUrl + 'backend/update/order',
  updateOrderDeliveryAddress: environment.backendUrl + 'backend/update/order/delivery-address',
  updateOrderContactData: environment.backendUrl + 'backend/update/order/contact-data',
  updateOrderDeliveryType: environment.backendUrl + 'backend/update/order/delivery-type',
  updateOrderPaymentType: environment.backendUrl + 'backend/update/order/payment-type',
  // PATCH
  updateOrderState: environment.backendUrl + 'backend/update/order/state',
  changeRatingArticle: environment.backendUrl + 'backend/change-rating/article',
  changeItemAmountShoppingBasket: environment.backendUrl + 'backend/change-item-amount/shopping-basket',
};

