import Footer from '@/components/Footer';

import {
  LockOutlined,
  UserOutlined,

} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import { userRegisterUsingPOST } from '@/services/wbapi-backend/userController';
const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Register: React.FC = () => {
  const [userRegisterState] = useState<API.LoginResult>({});
  const [type] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = (userInfo: API.UserVO) => {
    if (userInfo) {
      flushSync(() => {
        //设置用户登录信息到全局对象中去
        setInitialState({ loginUser: userInfo });
      });
    }
  };
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 登录
      const res = await userRegisterUsingPOST({
        ...values,
      });
      if (res.data) {
        // @ts-ignore
        fetchUserInfo(res.data);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/admin/interface_info');
        return;
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };
  const { status, type: RegisterType } = userRegisterState;
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="WB-API开放平台"
          subTitle={'一个提供 API 接口供开发者调用的平台'}
          initialValues={{
            autoRegister: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          {status === 'error' && RegisterType === 'account' && (
            <RegisterMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
