import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/home/Home");
const Cart = () => import("../views/cart/Cart");
const Category = () => import("../views/category/Category");
const Profile = () => import("../views/profile/Profile");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
