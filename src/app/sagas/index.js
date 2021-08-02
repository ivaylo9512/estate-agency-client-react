import loginWatcher from "./login";
import registerWatcher from "./register";
import { all } from "redux-saga/effects";

export default function* IndexSagas(){
    yield all([registerWatcher, loginWatcher])
}