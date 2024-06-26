export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/',
    name: '欢迎页',
    access: 'canUser',
    icon: 'smile',
    component: './welcome',
  },
  {
    path: '/interfaceInfo',
    name: '接口列表',
    access: 'canUser',
    icon: 'smile',
    component: './Index',
  },
  {
    path: '/interface_info/:id',
    name: '查看接口',
    access: 'canUser',
    icon: 'smile',
    component: './Index/InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        path: '/admin/interface_info',
        icon: 'table',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        path: '/admin/interface_analysis',
        icon: 'analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
