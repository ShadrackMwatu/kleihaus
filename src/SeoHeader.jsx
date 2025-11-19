export default function SeoHeader({ title, subtitle, hidden = false }) {
  const srOnly = {
    position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
    overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0
  };
  const h1Props = hidden ? { style: srOnly } : { className: "text-3xl md:text-4xl font-bold tracking-tight" };
  return (
    <header className="mb-4">
      <h1 {...h1Props}>{title}</h1>
      {subtitle ? <p className="text-neutral-600 mt-1">{subtitle}</p> : null}
    </header>
  );
}
