import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen text-white">
        <div className="flex flex-col justify-center items-center min-h-screen p-6">  
          <main className="w-full max-w-4xl rounded-lg shadow-2xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
