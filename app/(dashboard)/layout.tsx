import Sidebar from "./component/sidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className="bg-gray-100">
       {/*  <Headers/> */}
        <div className="flex h-screen overflow-hidden">
        <Sidebar />
          {children}
        </div>
      
        </body>
      </html>
    );
  }