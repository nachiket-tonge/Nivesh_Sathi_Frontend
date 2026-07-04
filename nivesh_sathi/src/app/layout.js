import "./globals.css";
import NavbarWrapper from "../components/navbar/NavbarWrapper";
import GoogleProvider from "../components/providers/GoogleProvider";

export const metadata = {
  title: "NiveshSathi",
  description: "AI-powered wealth management for Indian middle-class investors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleProvider>
          <NavbarWrapper />
          {children}
        </GoogleProvider>
      </body>
    </html>
  );
}