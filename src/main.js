
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import VueSwal from 'vue-swal';
import App from './App';
import router from './router';

import BootstrapVue from 'bootstrap-vue';



Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  
 el: '#app',
 BootstrapVue,
 router,
 vuetify,
 VueSwal,
 components: { App },
 template: '<App/>',
});
