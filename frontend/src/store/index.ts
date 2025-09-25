// ** Redux Imports
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ** Reducer Imports
import settingReducer from './setting'

const persistConfig = {
  key: 'unison',
  storage,
  whitelist: ['setting']
}

const reducers = combineReducers({
  setting: settingReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persister = persistStore(store)

export type RootState = ReturnType<typeof reducers>

export type AppDispatch = typeof store.dispatch

const { dispatch } = store

const useDispatch = () => useAppDispatch<AppDispatch>()
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export { store, persister, dispatch, useSelector, useDispatch }
