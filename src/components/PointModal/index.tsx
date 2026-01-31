import {
  Carousel,
  Divider,
  Modal,
  Space,
  Typography,
  Image,
  Button,
} from "antd";
import { type MapPoint, Route, type RouteDirection } from "@/types";
import { useEffect, useState, type FC } from "react";
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MAP_POINTS } from "@/data";

type Props = {
  point: MapPoint | null;
  onSetPoint(v: Props["point"]): void;
  modalOpen: boolean;
  onMoveToPoint(d: RouteDirection): void;
  route: Route | null;
  onSetModalOpen(v: boolean): void;
};

export const PointModal: FC<Props> = ({
  point,
  onSetPoint,
  onMoveToPoint,
  modalOpen,
  route,
  onSetModalOpen,
}) => {
  const [currentPoint, setCurrentPoint] = useState<MapPoint | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPoint(point);
    }, 500);
    return () => clearTimeout(timer);
  }, [point]);

  if (!currentPoint) return null;

  return (
    <Modal
      title={
        <Space orientation="vertical" size={2}>
          <Space wrap>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {currentPoint.title}
            </Typography.Text>
            {/*<Tag color={ROUTES_COLORS[point.route]}>*/}
            {/*{ROUTE_LABEL[point.route]}*/}
            {/*</Tag>*/}
          </Space>
          {/*{point.address ? (*/}
          {/*  <Typography.Text type="secondary">{point.address}</Typography.Text>*/}
          {/*) : null}*/}
        </Space>
      }
      open={!!point && modalOpen}
      onCancel={() => {
        if (route !== null) return;
        onSetModalOpen(false);
        onSetPoint(null);
      }}
      closable={route === null}
      footer={
        <ModalFooter
          route={route}
          onMoveToPoint={onMoveToPoint}
          point={point}
        />
      }
      width={720}
      centered
      destroyOnHidden
    >
      {/* Images */}
      {currentPoint.images?.length ? (
        <>
          <Carousel dots draggable>
            {currentPoint.images.map((src) => (
              <div
                key={src}
                style={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={src}
                  alt={currentPoint.title}
                  preview={false}
                  styles={{
                    root: {
                      width: "100%",
                      height: 200,
                      padding: "0 8px",
                    },
                    image: {
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                      overflow: "hidden",
                      objectFit: "contain",
                    },
                  }}
                />
              </div>
            ))}
          </Carousel>
          <Divider />
        </>
      ) : null}

      {/* Description */}
      <Typography.Paragraph style={{ marginBottom: 0 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {currentPoint.desc}
        </ReactMarkdown>
      </Typography.Paragraph>

      {/* Test Link */}
      {currentPoint.testLink && (
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <Button
            type="primary"
            href={currentPoint.testLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Пройди тестування для отримання призу
          </Button>
        </div>
      )}

      {/* Address */}
      {currentPoint.address && (
        <>
          <Divider />
          <div>
            <Typography.Text>Адреса / Орієнтир:</Typography.Text>{" "}
            <Typography.Link
              style={{ textDecoration: "underline" }}
              href={`https://www.google.com/maps?q=${currentPoint.lat},${currentPoint.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentPoint.address}
            </Typography.Link>
          </div>
        </>
      )}
    </Modal>
  );
};

type ModalFooterProps = {
  onMoveToPoint(d: RouteDirection): void;
  route: Route | null;
  point: MapPoint | null;
};

function ModalFooter({ onMoveToPoint, route, point }: ModalFooterProps) {
  if (route === null) return null;

  const routeArray = MAP_POINTS[route];
  const currentPointIndex = routeArray.findIndex((el) => el.id === point?.id);

  const isLast = currentPointIndex + 1 === routeArray.length;

  return (
    <Space
      style={{
        width: "100%",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      {currentPointIndex !== 0 ? (
        <Button onClick={() => onMoveToPoint("prev")} icon={<LeftOutlined />}>
          Попередня точка
        </Button>
      ) : (
        <div></div>
      )}

      {currentPointIndex + 1 <= routeArray.length && (
        <Button
          onClick={() => {
            onMoveToPoint("next");
          }}
          type="default"
          iconPlacement={isLast ? "start" : "end"}
          icon={isLast ? <CheckCircleOutlined /> : <RightOutlined />}
        >
          {isLast ? "Завершити" : "Наступна точка"}
        </Button>
      )}
    </Space>
  );
}
