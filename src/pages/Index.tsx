import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { categorias } from "@/lib/tramites";
import { FileText, MessageCircle, MousePointerClick } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-yellow text-brand-blue">
      <SiteHeader />

      {/* Hero */}
      <section className="container-app pt-8 pb-16 sm:pt-16 sm:pb-24 text-center">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-brand-blue max-w-4xl mx-auto">
          Tus trámites con el Estado, sin colas y sin complicaciones
        </h1>
        <p className="mt-6 text-lg sm:text-xl font-medium text-brand-blue/80 max-w-2xl mx-auto">
          Recibe tu documento oficial en menos de 24 horas directo a tu WhatsApp.
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-blue text-primary-foreground hover:bg-brand-blue-dark rounded-full font-bold text-base sm:text-lg px-8 py-7 shadow-pop"
          >
            <Link to="/tramites">¿Qué documento necesitas hoy? →</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm font-semibold text-brand-blue/70">Tus trámites en un Zas!</p>
      </section>

      {/* Categorías */}
      <section className="bg-background rounded-t-[2.5rem] py-16">
        <div className="container-app">
          <h2 className="font-display text-3xl sm:text-4xl text-center text-brand-blue">
            Elige tu categoría de trámite
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            Más de 20 documentos oficiales disponibles. Encuentra el tuyo.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categorias.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.id}
                  to={`/tramites/${c.id}`}
                  className="group bg-brand-yellow rounded-2xl p-5 flex flex-col items-center text-center shadow-soft hover:shadow-pop hover:-translate-y-1 transition-all"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-blue text-brand-yellow flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-brand-blue leading-tight">
                    {c.nombre}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-background py-16">
        <div className="container-app">
          <h2 className="font-display text-3xl sm:text-4xl text-center text-brand-blue">
            Cómo funciona
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: 1, icon: MousePointerClick, t: "Elige tu documento", d: "Selecciona el trámite que necesitas de nuestra lista." },
              { n: 2, icon: FileText, t: "Ingresa tus datos", d: "Completa un formulario corto con tu información básica." },
              { n: 3, icon: MessageCircle, t: "Recíbelo en WhatsApp", d: "Te entregamos tu documento oficial en menos de 24 horas." },
            ].map((s) => (
              <div key={s.n} className="bg-brand-blue text-primary-foreground rounded-3xl p-8 text-center shadow-pop">
                <div className="w-16 h-16 rounded-full bg-brand-yellow text-brand-blue mx-auto flex items-center justify-center mb-5">
                  <s.icon className="w-8 h-8" />
                </div>
                <div className="font-display text-5xl text-brand-yellow mb-2">{s.n}</div>
                <h3 className="font-display text-xl mb-2">{s.t}</h3>
                <p className="opacity-90 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
