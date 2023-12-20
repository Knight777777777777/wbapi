import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
  values: API.InterfaceInfo;
};
const UpdateModal: React.FC<Props> = (props) => {
  const { onCancel, onSubmit, columns, visible, values } = props;
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (formRef && values) {
      const statusMap = {
        0: '关闭',
        1: '运行中',
        2: '异常',
      };
      const mappedStatus = statusMap[values.status as never];
      formRef.current?.setFieldsValue({
        ...values,
        status: mappedStatus,
      });
    }
  }, [values]);
  return (
    <Modal onCancel={() => onCancel?.()} visible={visible} footer={null}>
      <ProTable
        type={'form'}
        columns={columns}
        formRef={formRef}
        onSubmit={async (values) => {
          onSubmit?.(values);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
