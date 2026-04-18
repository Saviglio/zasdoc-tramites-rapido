import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { getSolicitudes, type Solicitud } from "@/lib/solicitudes";
import { findDocumento, FEE_ZASDOC } from "@/lib/tramites";
import { CheckCircle2, MessageCircle } from "lucide-react";

const Confirmacion = () => {
  const { solicitudId } = useParams();
  const [sol, setSol] = useState<Solicitud | null>(null);

  useEffect(() => {
    const s = getSolicitudes().find((x) => x.id === solicitudId) || null;
    setSol(s);
  }, [solicitudId]);

  if (!solicitudId) return <Navigate to="/" replace />;
  if (!sol) {
    return (
      <div className="min-h-screen bg-brand-yellow flex items-center justify-center">
        <p className="text-brand-blue font-bold">Cargando…</p>
      </div>
    );
  }

  const found = findDocumento(sol.documentoId);
  const tasa = found?.documento.tasaEstado ?? sol.precio - FEE_ZASDOC;
  const datosTexto = Object.entries(sol.datos).map(([k, v]) => `${k}: ${v}`).join(", ");

  const waMsg = encodeURIComponent(
    `Hola, acabo de solicitar ${sol.documentoNombre} en Zas!doc. ${datosTexto}. Mi nombre es ${sol.nombre}.`,
  );
  const waUrl = `https://wa.me/51999999999?text=${waMsg}`;

  return (
    <div className="min-h-screen bg-brand-yellow text-brand-blue">
      <SiteHeader />
      <main className="container-app py-10 max-w-2xl">
        <div className="bg-background rounded-3xl p-6 sm:p-10 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-brand-blue" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-brand-blue">¡Solicitud recibida!</h1>
              <p className="text-sm text-muted-foreground">Revisa el resumen antes de continuar.</p>
            </div>
          </div>

          <div className="bg-brand-blue-soft rounded-2xl p-5 space-y-3">
            <Row label="Documento" value={sol.documentoNombre} />
            <Row label="Solicitante" value={sol.nombre} />
            <Row label="WhatsApp" value={sol.whatsapp} />
            {Object.entries(sol.datos).map(([k, v]) => (
              <Row key={k} label={k} value={v} />
            ))}
          </div>

          <div className="mt-6 bg-brand-yellow rounded-2xl p-5">
            <h3 className="font-display text-lg text-brand-blue mb-3">Precio estimado</h3>
            <div className="flex justify-between text-sm text-brand-blue/80">
              <span>Tasa del Estado</span>
              <span className="font-semibold">S/ {tasa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-blue/80 mt-1">
              <span>Fee Zas!doc</span>
              <span className="font-semibold">S/ {FEE_ZASDOC.toFixed(2)}</span>
            </div>
            <div className="border-t border-brand-blue/20 mt-3 pt-3 flex justify-between font-display text-xl text-brand-blue">
              <span>Total</span>
              <span>S/ {(tasa + FEE_ZASDOC).toFixed(2)}</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Un asesor Zas!doc verificará tu solicitud y te contactará por WhatsApp en los próximos minutos.
          </p>

          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-full font-bold h-14 text-base shadow-pop">
              <MessageCircle className="w-5 h-5 mr-2" />
              Confirmar y continuar por WhatsApp
            </Button>
          </a>

          <Link to="/" className="block text-center mt-4 text-sm text-brand-blue font-semibold hover:underline">
            Volver al inicio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-brand-blue/70">{label}</span>
    <span className="font-semibold text-brand-blue text-right">{value}</span>
  </div>
);

export default Confirmacion;
