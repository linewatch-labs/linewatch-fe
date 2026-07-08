import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "LineWatch",
  description: "Manufacturing quality event dashboard",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
