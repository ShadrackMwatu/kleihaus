Install: upload these two files to src/components/.

Usage (example in App.jsx)
import SeoHeader from "./components/SeoHeader.jsx";
import SmartImage from "./components/SmartImage.jsx";

export default function App() {
  return (
    <main className="container mx-auto px-6 py-6">
      <SeoHeader
        title="Kleihaus Ceramics — Tiles, Sanitaryware, Paints"
        subtitle="Tiles, sanitaryware and paints for homes and commercial projects across Kenya."
        hidden={false}
      />

      {/* Replace <img> with SmartImage for better SEO & performance */}
      {/*
      <SmartImage
        src="/images/og-cover.jpg"
        alt="Showroom display of ceramic wall and floor tiles with sanitaryware sets at Kleihaus Ceramics"
        width={1200}
        height={630}
        className="rounded-xl border"
      />
      */}
    </main>
  );
}
