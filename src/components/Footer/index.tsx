import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {GITHUB_LINK} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = '蚂蚁集团体验技术部出品';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'name',
          title: 'Knight',
          href: GITHUB_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: GITHUB_LINK,
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'github',
          href: GITHUB_LINK,
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
