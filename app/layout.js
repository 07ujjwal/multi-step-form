import "./globals.css";
import { Toaster } from "react-hot-toast";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <div>Multi-Step Form</div>
          <DarkModeToggle />
        </header>
        <main className="p-4">{children}</main>
        <Toaster position="top-right" reverseOrder={false} />
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>© 2024 Multi-Step Form Project. All rights reserved.</p>
          <p>
            Built with <span className="text-red-500">❤</span> by Ujjwal Kumar
            Singh.
          </p>
        </footer>
      </body>
    </html>
  );
}
