import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Bio from "./pages/Bio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import GameDesign from "./pages/GameDesign";
import ScrollToTop from "./components/ScrolltoTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        < ScrollToTop/>
        <SidebarProvider defaultOpen={false}>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <header className="sticky top-0 z-40 bg-gradient-to-r from-purple-200/80 via-yellow-100/80 to-teal-100/70 backdrop-blur-md border-b-2 border-whimsical-border shadow-lg p-5">
                <SidebarTrigger className="h-10 w-20 bg-teal-400 hover:bg-whimsical-accent-hover text-white rounded-full 
                                            shadow-md transition-all duration-300 hover:scale-105 [&_svg]:h-5 [&_svg]:w-5 " />
              </header>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/bio" element={<Bio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/game-design" element={<GameDesign />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
