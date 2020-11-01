import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
// import firebase from 'firebase/app'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAvqbgtLWC-rP8KfPQXNfeE9wFPIhyTonA",
//     authDomain: "recyclo-dashboard.firebaseapp.com",
//     databaseURL: "https://recyclo-dashboard.firebaseio.com",
//     projectId: "recyclo-dashboard",
//     storageBucket: "recyclo-dashboard.appspot.com",
//     messagingSenderId: "365033775148",
//     appId: "1:365033775148:web:ed20960247d14026d13189"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const db = firebaseApp.firestore();
new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')