import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './components/app.vue';
import preloader from './components/preloader.vue';
import start from './views/main.vue';
import raiting from './views/raiting.vue';
import works from './views/works.vue';
import contacts from './views/contacts.vue';
import fail from './views/fail.vue';
import team from './views/team.vue';
import team_member from './views/team_member.vue';
import VueTouch from 'vue-touch';
import VeeValidate from 'vee-validate';


Vue.use(VueRouter);
Vue.use(VueTouch);
Vue.use(VeeValidate);


let router = new VueRouter({
	routes:[
		{ 
      path: '/', 
      component: start
    },
		{ path: '/raiting', component: raiting},
		{ path: '/works', component: works },
		{ path: '/contacts', component: contacts},
    { path: '/team', component: team},
    { path: '/team/:id', component: team_member},
    { path: '/404', component: fail},
    { path: '*', redirect: '/404' }
	]
});

let App = new Vue({
  el: '#app',
  router: router,
  data(){
  	return{
  		
  	}
  },
  components:{
  	preloader,
  	app
  }
})
