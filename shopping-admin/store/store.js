import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { categoryApi } from "./slices/categoryApi"
import { productApi } from "./slices/productApi"
import { orderApi } from "./slices/orderApi"
import { customerApi } from "./slices/customerApi"
import { settingsApi } from "./slices/settingsApi"
import { couponApi } from "./slices/couponApi"
import { sliderApi } from "@/services/slider.api"

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [sliderApi.reducerPath]: sliderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sliderApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      customerApi.middleware,
      settingsApi.middleware,
      couponApi.middleware,
    ),
})

setupListeners(store.dispatch)
