import Reducer1 from "./reducer1";
import AuthReducer from "./auth_reducer";
import UserReducer from "./user_reducer";
import PostsReducer from "./posts.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  reducer1: Reducer1,
  auth_reducer: AuthReducer,
  user_reducer: UserReducer,
  posts_reducer: PostsReducer,
});

export default rootReducer;
