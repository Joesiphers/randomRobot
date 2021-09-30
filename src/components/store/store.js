import { createStore,combineReducers} from "redux";
import activeReducer from "./activeReducer";
import directionReducer from "./directionReducer";
import positionReducer from "./positionReducer";
const reducer=combineReducers({
        active:activeReducer,
        direction:directionReducer,
        position: positionReducer
    } )
const store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;