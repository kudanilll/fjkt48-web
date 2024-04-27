import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Carousel: {
            dotHeight: 5,
            dotWidth: 5,
            dotActiveWidth: 5,
          },
        },
      }}>
      {children}
    </ConfigProvider>
  );
}
