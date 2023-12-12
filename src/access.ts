/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: InitialStates | undefined) {
  const loginUser = initialState?.loginUser ?? {};
  return {
    canUser: loginUser,
    canAdmin: loginUser?.userRole === 'admin',
  };
}
