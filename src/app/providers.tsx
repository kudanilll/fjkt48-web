import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#dc2626", colorTextDescription: "#374151" },
        components: {
          Card: { headerFontSize: 22 },
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