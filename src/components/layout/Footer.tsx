const Footer = () => {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-center text-sm text-muted-foreground nav-text">
          SOLARIS · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
