export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口',
        path: '/admin/interface_info',
        icon: 'table',
        component: './InterfaceInfo',
      },
    ],
  },
  { path: '/', redirect: '/admin/interface_info' },
  { path: '*', layout: false, component: './404' },
];
