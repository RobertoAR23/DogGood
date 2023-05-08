import { applyMiddleware, createStore } from "redux"; // redux
import { composeWithDevTools } from "redux-devtools-extension"; // redux-devtools-extension
import thunk from "redux-thunk"; // redux-thunk
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));