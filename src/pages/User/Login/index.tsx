import Footer from '@/components/Footer';
import {
  LockOutlined,
  UserOutlined,

} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import {Helmet, history, Link, useModel} from '@umijs/max';
import {Alert, Divider, message, Space} from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import { userLoginUsingPOST } from '@/services/wbapi-backend/userController';
import {ProFormCheckbox} from "@ant-design/pro-form/lib";
import {GITHUB_LINK} from "@/constants";
const LoginMessage: React.FC<{
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
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
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
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST({
        ...values,
      });
      if (res.data) {
        fetchUserInfo(res.data);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
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
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 4,
                    message: '账号长度不小于 4 位',
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    message: '密码长度不能小于 8 位',
                  }
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical"/>} align="start">
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <Link to="/user/register" >新用户注册</Link>
              <a
                style={{
                  float: 'right',
                }}
                href={GITHUB_LINK}
              >
                忘记密码?请联系
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
