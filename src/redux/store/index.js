import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "../reducers";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Define storage engine
  whitelist: ["language"], // Only persist the language reducer (or add more reducers to whitelist if needed)
};

// Enhance the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
