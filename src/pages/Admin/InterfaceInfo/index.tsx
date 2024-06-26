import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';

import UpdateModal from '@/pages/Admin/InterfaceInfo/components/UpdateModal';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfosUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/wbapi-backend/interfaceInfoController';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleupdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);
  const tableRef = useRef(); //创建对ProTable的引用
  /**
   * @en-US Add node
   * @zh-CN 添加api
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      handleModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('请求失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        id: currentRow?.id,
        ...fields,
      });
      hide();
      message.success('修改成功');
      actionRef.current?.reload();
      handleupdateModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('修改失败!' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('Delete failed, please try again' + error.message);
      return false;
    }
  };
  /**
   * 批量删除节点
   */
  const handleBatchDelete = async () => {
    if (selectedRowsState.length === 0) {
      message.error('请选择要删除的行');
      return;
    }

    Modal.confirm({
      title: '确认删除？',
      content: '确定要删除所选行吗？',
      onOk: async () => {
        try {
          await deleteInterfaceInfosUsingPOST({
            ids: selectedRowsState.map((row) => row.id) as never,
          });
          message.success('Deleted successfully and will refresh soon');
          actionRef.current?.reload();
          setSelectedRows([]); // 清空选中行
          return true;
        } catch (error: any) {
          message.error('Delete failed, please try again' + error.message);
          return false;
        }
      },
    });
  };
  /**
   *  Delete node
   * @zh-CN 上线节点
   *
   * @param selectedRows
   */
  const handleOnline = async (record: API.InterfaceInfo) => {
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      message.success('上线成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      message.error('上线失败' + error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 下线节点
   *
   * @param selectedRows
   */
  const handleOffline = async (record: API.InterfaceInfo) => {
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      message.success('关闭成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      message.error('关闭失败' + error.message);
      return false;
    }
  };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: 'API名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      width: 100,
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
    },
    {
      title: '创建人id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed:'right',
      width: 200,
      render: (_, record) => [
        <Button
          key="config"
          type="primary"
          onClick={() => {
            handleupdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,
        record.status === 0 ? (
          <Button
            key="online"
            type="primary"
            onClick={() => {
              handleOnline(record);
            }}
          >
            上线
          </Button>
        ) : record.status === 1 ? (
          <Button
            key="offline"
            danger
            onClick={() => {
              handleOffline(record);
            }}
          >
            关闭
          </Button>
        ) : null,
        <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo, API.PageParams>
        scroll={{x: 'max-content'}}
        headerTitle={'API表格'}
        actionRef={actionRef}
        rowKey="id"
        ref={tableRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params: any) => {
          try {
            const res = await listInterfaceInfoByPageUsingGET({
              ...params,
            });
            if (res?.data) {
              return {
                data: res?.data.records || [],
                success: true,
                total: res.data.total,
              };
            } else {
              return {
                data: [],
                success: false,
                total: 0,
              };
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button type="primary" onClick={handleBatchDelete}>
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <UpdateModal
        columns={columns}
        onCancel={() => {
          handleupdateModalVisible(false);
        }}
        onSubmit={async (values) => {
          await handleUpdate(values);
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.InterfaceInfo>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfo>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalVisible(false);
        }}
        onSubmit={async (values) => {
          await handleAdd(values);
        }}
        visible={createModalVisible}
      />
    </PageContainer>
  );
};
export default TableList;
