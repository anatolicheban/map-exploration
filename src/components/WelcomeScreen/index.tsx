import { Button, Modal, Space, Typography } from "antd";
import { useMemo } from "react";
import {
  historical01x1,
  historical08x1,
  interesting07x1,
  military01x1,
} from "@assets/images/points";

type Props = {
  open: boolean;
  onStart(): void;
};

export const WelcomeScreen = ({ open, onStart }: Props) => {
  const backgroundImage = useMemo(() => {
    const images = [historical01x1, historical08x1, interesting07x1, military01x1];
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  return (
    <Modal
      open={open}
      centered
      closable={false}
      maskClosable={false}
      footer={null}
      width={560}
      destroyOnHidden
    >
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.86)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <Space orientation="vertical" size={16} style={{ width: "100%" }}>
          <Typography.Title level={3} style={{ margin: 0, textAlign: "center" }}>
            Вітаємо у Бородянці!
          </Typography.Title>
          <Typography.Paragraph style={{ margin: 0, textAlign: "center" }}>
            Обери маршрут і вирушай у подорож місцями, які зберігають історію,
            памʼять та силу нашої громади.
          </Typography.Paragraph>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              size="large"
              onClick={onStart}
            >
              Почати
            </Button>
          </div>
        </Space>
      </div>
    </Modal>
  );
};
