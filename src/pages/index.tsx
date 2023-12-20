import { listInterfaceInfoByPageUsingGet } from '@/services/wbapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [total, setTotal] = useState<number>(0);
  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      console.log('请求失败' + error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <PageContainer title="在线接口开方平台">
      <List
        className={'my-list'}
        rowKey="id"
        loading={loading}
        dataSource={list}
        itemLayout={'horizontal'}
        renderItem={(item) => {
          const apilink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[
                <a key={item.id} href={apilink}>
                  查看
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={apilink}> {item.name}</a>}
                description={item.description}
              />
            </List.Item>
          );
        }}
        pagination={{
          showTotal(total: number) {
            return '总数：' + total;
          },
          pageSize: 5,
          total,
          onChange: (page, pageSize) => {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};
export default Index;
