import "./globals.css";

export const metadata = {
  title: "Glow Gadget — Share the night before it ends",
  description: "A stylish SD card reader charm that moves camera photos to your phone in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
