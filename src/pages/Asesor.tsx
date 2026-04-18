import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { getSolicitudes, updateEstado, type EstadoSolicitud, type Solicitud } from "@/lib/solicitudes";
import { toast } from "sonner";

const estadoColor: Record<EstadoSolicitud, string> = {
  "Pendiente verificación": "bg-amber-100 text-amber-800 border-amber-300",
  "Cotizado": "bg-blue-100 text-blue-800 border-blue-300",
  "Pago recibido": "bg-purple-100 text-purple-800 border-purple-300",
  "En proceso": "bg-orange-100 text-orange-800 border-orange-300",
  "Entregado": "bg-green-100 text-green-800 border-green-300",
};

// NOTE: This is a temporary client-side gate to prevent casual access to the
// advisor panel. It is NOT real security — anyone with the password (or who
// inspects the bundle) can get in. For production, migrate to Lovable Cloud
// with Supabase Auth + RLS so only authenticated staff can read solicitudes.
const ADVISOR_PASSCODE = "zasdoc-2025";
const SESSION_KEY = "zasdoc_asesor_session";

const Asesor = () => {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [list, setList] = useState<Solicitud[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) setList(getSolicitudes());
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADVISOR_PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      toast.success("Acceso concedido");
    } else {
      toast.error("Código incorrecto");
      setPasscode("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPasscode("");
  };

  const marcarEntregado = (id: string) => {
    setList(updateEstado(id, "Entregado"));
    toast.success("Solicitud marcada como entregada");
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-brand-blue">
          <div className="container-app py-5 flex items-center justify-between">
            <Link to="/"><Logo variant="onBlue" /></Link>
            <span className="text-primary-foreground font-semibold text-sm">Panel del Asesor</span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm bg-card rounded-2xl shadow-soft border p-6 space-y-4"
          >
            <div>
              <h1 className="font-display text-2xl text-brand-blue">Acceso restringido</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ingresa el código de asesor para ver las solicitudes.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passcode">Código de acceso</Label>
              <Input
                id="passcode"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-primary-foreground rounded-full font-semibold"
            >
              Ingresar
            </Button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-brand-blue">
        <div className="container-app py-5 flex items-center justify-between">
          <Link to="/"><Logo variant="onBlue" /></Link>
          <div className="flex items-center gap-3">
            <span className="text-primary-foreground font-semibold text-sm">Panel del Asesor</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="rounded-full font-semibold"
            >
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container-app py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl text-brand-blue">Solicitudes entrantes</h1>
            <p className="text-muted-foreground">Gestiona y actualiza el estado de cada trámite.</p>
          </div>
          <Badge className="bg-brand-yellow text-brand-blue border-0 text-sm py-1.5 px-3">
            {list.length} solicitudes
          </Badge>
        </div>

        <div className="bg-card rounded-2xl shadow-soft overflow-hidden border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-blue-soft hover:bg-brand-blue-soft">
                  <TableHead className="text-brand-blue font-bold">Usuario</TableHead>
                  <TableHead className="text-brand-blue font-bold">Documento</TableHead>
                  <TableHead className="text-brand-blue font-bold">Datos</TableHead>
                  <TableHead className="text-brand-blue font-bold">Estado</TableHead>
                  <TableHead className="text-brand-blue font-bold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="font-semibold text-brand-blue">{s.nombre}</div>
                      <div className="text-xs text-muted-foreground">{s.whatsapp}</div>
                    </TableCell>
                    <TableCell className="font-medium">{s.documentoNombre}</TableCell>
                    <TableCell className="text-sm">
                      {Object.entries(s.datos).map(([k, v]) => (
                        <div key={k}><span className="text-muted-foreground">{k}:</span> <span className="font-medium">{v}</span></div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${estadoColor[s.estado]} font-semibold`}>
                        {s.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        disabled={s.estado === "Entregado"}
                        onClick={() => marcarEntregado(s.id)}
                        className="bg-brand-blue hover:bg-brand-blue-dark text-primary-foreground rounded-full font-semibold"
                      >
                        Marcar como entregado
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Asesor;
