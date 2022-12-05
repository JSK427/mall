import axios from "axios";

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000,
  });
  //axios的拦截器
  //请求拦截的作用 成功/失败
  instance.interceptors.request.use(
    (config) => {
      //拦截成功要返回
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  //发送真正网络请求
  return instance(config);
}
