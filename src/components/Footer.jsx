// Page footer: a rounded white card like the sections (design: magic-gourd-portfolio-v14.html)
const Footer = () => {
  // the year is set when the static site is built, so rebuild once a year to update it
  const year = new Date().getFullYear();

  return (
    <footer className="card-section rounded-[20px] bg-panel py-8 text-sm text-muted">
      © {year} Akbar Ruzi · Magic Gourd
    </footer>
  );
};

export default Footer;
