import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Tramites from "./pages/Tramites.tsx";
import CategoriaDetalle from "./pages/CategoriaDetalle.tsx";
import Solicitar from "./pages/Solicitar.tsx";
import Confirmacion from "./pages/Confirmacion.tsx";
import Asesor from "./pages/Asesor.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/tramites/:categoriaId" element={<CategoriaDetalle />} />
          <Route path="/solicitar/:docId" element={<Solicitar />} />
          <Route path="/confirmacion/:solicitudId" element={<Confirmacion />} />
          <Route path="/asesor" element={<Asesor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
