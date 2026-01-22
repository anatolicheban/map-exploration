import { Modal, Space, Typography } from "antd";
import type { FC } from "react";

type Props = {
  open: boolean;
  onClose(): void;
};

export const FinishModal: FC<Props> = ({ open, onClose }) => {
  if (!open) return;
  return (
    <Modal
      centered
      title={
        <Space orientation="vertical" size={2}>
          <Space wrap>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {"Done!"}
            </Typography.Text>
          </Space>
        </Space>
      }
      open={open}
      destroyOnHidden
      footer={<></>}
      onCancel={onClose}
    ></Modal>
  );
};
