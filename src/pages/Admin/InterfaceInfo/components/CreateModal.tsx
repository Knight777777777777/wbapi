import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { onCancel, onSubmit, columns, visible } = props;
  return (
    <Modal onCancel={() => onCancel?.()} visible={visible} footer={null}>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values) => {
          onSubmit?.(values);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
