import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "EdgeBench AI",
  description: "Diagnostic tools for Edge AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col font-sans antialiased selection:bg-primary-container selection:text-on-primary-container`}
      >
        <header className="flex justify-between items-center w-full px-lg py-sm fixed top-0 z-50 bg-surface-container/70 backdrop-blur-xl border-b border-white/10 docked full-width text-primary">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-on-surface">terminal</span>
            <h1 className="font-bold text-lg text-on-surface tracking-tight">EdgeBench AI</h1>
          </div>
          <div>
            <span className="px-sm py-xs rounded-full bg-primary-container/20 text-primary font-mono text-xs border border-primary/30 uppercase flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              LIVE
            </span>
          </div>
        </header>

        <nav className="hidden md:flex fixed inset-y-0 left-0 z-[60] flex-col py-lg bg-surface-container-low backdrop-blur-2xl h-full w-72 rounded-r-xl border-r border-white/10 shadow-xl mt-[65px]">
          <div className="px-lg pb-lg border-b border-white/10 mb-md flex flex-col gap-sm">
            <div className="w-12 h-12 rounded-full bg-surface-container-high border border-white/10 overflow-hidden">
              <div className="w-full h-full bg-surface-bright"></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-on-surface">Lead Architect</h2>
              <p className="text-sm text-on-surface-variant">Project: EdgeBench-01</p>
              <p className="font-mono text-xs text-outline mt-xs">v1.0.4</p>
            </div>
          </div>
          <div className="flex flex-col gap-unit px-sm">
            <a href="/" className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface mx-2 hover:bg-white/5 transition-all rounded-lg">
              <span className="material-symbols-outlined">memory</span>
              <span>Models</span>
            </a>
            <a href="/benchmark" className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface mx-2 hover:bg-white/5 transition-all rounded-lg">
              <span className="material-symbols-outlined">developer_board</span>
              <span>Hardware</span>
            </a>
            <a href="/results" className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface mx-2 hover:bg-white/5 transition-all rounded-lg">
              <span className="material-symbols-outlined">analytics</span>
              <span>Results</span>
            </a>
            <a href="/code" className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface mx-2 hover:bg-white/5 transition-all rounded-lg">
              <span className="material-symbols-outlined">code</span>
              <span>Code</span>
            </a>
          </div>
        </nav>

        <main className="flex-1 pt-[80px] pb-[80px] md:pb-lg md:ml-72 px-lg max-w-container-max mx-auto w-full">
          {children}
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-md pb-md pt-sm bg-surface-container/70 backdrop-blur-xl border-t border-white/10 docked full-width text-primary">
          <a href="/" className="flex flex-col items-center justify-center hover:text-primary transition-all">
            <span className="material-symbols-outlined mb-unit">cloud_upload</span>
            <span className="font-mono text-xs uppercase">Upload</span>
          </a>
          <a href="/benchmark" className="flex flex-col items-center justify-center hover:text-primary transition-all">
            <span className="material-symbols-outlined mb-unit">dashboard</span>
            <span className="font-mono text-xs uppercase">Dashboard</span>
          </a>
          <a href="/results" className="flex flex-col items-center justify-center hover:text-primary transition-all">
            <span className="material-symbols-outlined mb-unit">analytics</span>
            <span className="font-mono text-xs uppercase">Results</span>
          </a>
          <a href="/code" className="flex flex-col items-center justify-center hover:text-primary transition-all">
            <span className="material-symbols-outlined mb-unit">code</span>
            <span className="font-mono text-xs uppercase">Code</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
