import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { categorias } from "@/lib/tramites";

const Tramites = () => {
  return (
    <div className="min-h-screen bg-brand-yellow text-brand-blue">
      <SiteHeader />
      <main className="container-app py-10">
        <h1 className="font-display text-3xl sm:text-5xl text-brand-blue">
          ¿Qué tipo de trámite necesitas?
        </h1>
        <p className="mt-3 text-brand-blue/80 font-medium">
          Toca una categoría para ver los documentos disponibles.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categorias.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                to={`/tramites/${c.id}`}
                className="group bg-background rounded-2xl p-5 flex flex-col items-center text-center shadow-soft hover:shadow-pop hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-blue text-brand-yellow flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm sm:text-base text-brand-blue leading-tight">
                  {c.nombre}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">{c.documentos.length} documento{c.documentos.length !== 1 && "s"}</span>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Tramites;
