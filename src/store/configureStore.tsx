import { createStore } from "redux";
import { rootReducer } from "./slices";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "cart", "favorite", "cartSetting"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer);
export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
