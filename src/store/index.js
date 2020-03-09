import Vue from "vue";
import Vuex from "vuex";
import VuexEasyFirestore from "vuex-easy-firestore";
import { Firebase, initFirebase } from "../config/firebase.js";
import auth from "./modules/auth.js";
import chat from "./modules/chat.js";

Vue.use(Vuex);

const easyFirestore = VuexEasyFirestore([chat], {
  logging: true,
  FirebaseDependency: Firebase
});

const storeData = {
  plugins: [easyFirestore],
  modules: {
    auth
  }
};

const store = new Vuex.Store(storeData);

// initFirebase
initFirebase().catch(error => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
  console.error(error);
});

export default store;
