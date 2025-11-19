export default function SmartImage({
  src, alt, width, height, className = "", ...rest
}) {
  if (!alt) console.warn("SmartImage: Missing `alt` text for", src);
  return (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
