import { Link, Navigate, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { categorias } from "@/lib/tramites";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoriaDetalle = () => {
  const { categoriaId } = useParams();
  const categoria = categorias.find((c) => c.id === categoriaId);
  if (!categoria) return <Navigate to="/tramites" replace />;

  const Icon = categoria.icon;

  return (
    <div className="min-h-screen bg-brand-yellow text-brand-blue">
      <SiteHeader />
      <main className="container-app py-10">
        <Link to="/tramites" className="inline-flex items-center gap-1 text-brand-blue font-semibold hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" /> Volver a categorías
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-blue text-brand-yellow flex items-center justify-center">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-brand-blue">{categoria.nombre}</h1>
            <p className="text-brand-blue/80 font-medium">{categoria.descripcion}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {categoria.documentos.map((doc) => (
            <Link
              key={doc.id}
              to={`/solicitar/${doc.id}`}
              className="bg-background rounded-2xl p-6 flex items-center justify-between gap-4 shadow-soft hover:shadow-pop hover:-translate-y-0.5 transition-all"
            >
              <div>
                <h3 className="font-bold text-lg text-brand-blue">{doc.nombre}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Desde <span className="font-semibold text-brand-blue">S/ {doc.precio}</span> · Entrega en 24h
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-yellow text-brand-blue flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CategoriaDetalle;
