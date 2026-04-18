import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const SiteHeader = () => (
  <header className="container-app flex items-center justify-between py-5">
    <Link to="/" aria-label="Inicio Zas!doc">
      <Logo />
    </Link>
    <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-primary-foreground rounded-full font-bold shadow-pop">
      <Link to="/tramites">Iniciar trámite</Link>
    </Button>
  </header>
);

export default SiteHeader;
