function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4 text-center sm:mt-6">
      <p className="font-sans text-[0.8125rem] leading-5 text-slate-400">
        © {year} Tobias Lindblom
      </p>
    </footer>
  );
}

export default Footer;
