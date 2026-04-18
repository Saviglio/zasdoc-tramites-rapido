import Logo from "./Logo";

const SiteFooter = () => (
  <footer className="bg-brand-blue text-primary-foreground mt-20">
    <div className="container-app py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Logo variant="onBlue" />
      <p className="text-sm opacity-90">
        ¿Necesitas ayuda? Escríbenos a{" "}
        <a href="mailto:hola@zasdoc.pe" className="underline font-semibold">hola@zasdoc.pe</a>
      </p>
    </div>
  </footer>
);

export default SiteFooter;
