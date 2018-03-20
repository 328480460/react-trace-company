import { createStore, combineReducers } from "redux";
import { changeUpdate } from "./reducter.js";
import {routerReducer } from "react-router-redux";
// Store
export const store = createStore(changeUpdate);
