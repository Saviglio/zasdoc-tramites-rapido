import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findDocumento, type FormType } from "@/lib/tramites";
import { addSolicitud, type Solicitud } from "@/lib/solicitudes";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const fieldsByType: Record<FormType, { key: string; label: string; placeholder: string }[]> = {
  partida: [{ key: "DNI", label: "DNI del titular", placeholder: "8 dígitos" }],
  sunarp: [{ key: "N° Partida Electrónica", label: "N° de Partida Electrónica", placeholder: "Ej. 11234567" }],
  vehicular: [{ key: "N° de Placa", label: "N° de Placa del vehículo", placeholder: "Ej. ABC-123" }],
  migracion: [{ key: "DNI o Pasaporte", label: "DNI o Pasaporte", placeholder: "Documento de identidad" }],
  generico: [{ key: "DNI", label: "DNI", placeholder: "8 dígitos" }],
};

const baseSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo").max(100),
  whatsapp: z.string().trim().min(7, "Número inválido").max(20),
  campo: z.string().trim().min(3, "Campo requerido").max(50),
});

const Solicitar = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const found = useMemo(() => (docId ? findDocumento(docId) : null), [docId]);
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [campo, setCampo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!found) return <Navigate to="/tramites" replace />;
  const { categoria, documento } = found;
  const field = fieldsByType[documento.formType][0];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = baseSchema.safeParse({ nombre, whatsapp, campo });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const sol: Solicitud = {
      id: `sol-${Date.now()}`,
      nombre,
      whatsapp,
      documentoId: documento.id,
      documentoNombre: documento.nombre,
      datos: { [field.key]: campo },
      estado: "Pendiente verificación",
      fecha: new Date().toISOString(),
      precio: documento.precio,
    };
    addSolicitud(sol);
    toast.success("Solicitud registrada");
    navigate(`/confirmacion/${sol.id}`);
  };

  return (
    <div className="min-h-screen bg-brand-yellow text-brand-blue">
      <SiteHeader />
      <main className="container-app py-10 max-w-2xl">
        <Link to={`/tramites/${categoria.id}`} className="inline-flex items-center gap-1 text-brand-blue font-semibold hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" /> Volver
        </Link>

        <div className="bg-background rounded-3xl p-6 sm:p-10 shadow-soft">
          <p className="text-sm font-semibold text-brand-blue/70 uppercase tracking-wide">{categoria.nombre}</p>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-blue mt-1">{documento.nombre}</h1>
          <p className="text-muted-foreground mt-2">Completa tus datos para verificar disponibilidad.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="campo" className="text-brand-blue font-semibold">{field.label}</Label>
              <Input
                id="campo"
                value={campo}
                onChange={(e) => setCampo(e.target.value)}
                placeholder={field.placeholder}
                className="mt-2 rounded-xl border-2 border-brand-blue/20 focus-visible:border-brand-blue h-12"
                maxLength={50}
              />
              {errors.campo && <p className="text-sm text-destructive mt-1">{errors.campo}</p>}
            </div>

            <div>
              <Label htmlFor="nombre" className="text-brand-blue font-semibold">Tu nombre completo</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Ana Pérez Gómez"
                className="mt-2 rounded-xl border-2 border-brand-blue/20 focus-visible:border-brand-blue h-12"
                maxLength={100}
              />
              {errors.nombre && <p className="text-sm text-destructive mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="whatsapp" className="text-brand-blue font-semibold">Tu número de WhatsApp</Label>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+51 9XX XXX XXX"
                className="mt-2 rounded-xl border-2 border-brand-blue/20 focus-visible:border-brand-blue h-12"
                maxLength={20}
              />
              {errors.whatsapp && <p className="text-sm text-destructive mt-1">{errors.whatsapp}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-blue text-primary-foreground hover:bg-brand-blue-dark rounded-full font-bold h-14 text-base shadow-pop"
            >
              Consultar disponibilidad →
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Solicitar;
