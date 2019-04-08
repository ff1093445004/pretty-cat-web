import Vue from "vue";
import Router from "vue-router";
import ProductList from "../components/ProductList";
import ProductAdd from "../components/ProductAdd";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/ProductList",
      name: "ProductList",
      component: ProductList
    },
    {
      path: "/ProductAdd",
      name: "ProductAdd",
      component: ProductAdd
    },
    {
      path: "*",
      redirect: "/ProductList"
    }
  ]
});
