export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto px-6 lg:px-12 py-2">
      <div
        className="absolute left-6 lg:left-12 right-6 lg:right-12 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(244,114,182,0.15) 20%, rgba(244,114,182,0.25) 50%, rgba(244,114,182,0.15) 80%, transparent 100%)",
        }}
      />
      {label && (
        <div
          className="relative z-10 px-4 py-1 mono-label"
          style={{
            background: "#282C33",
            color: "rgba(244,114,182,0.3)",
            fontSize: "0.6rem",
          }}
        >
          ◆ {label} ◆
        </div>
      )}
    </div>
  );
}
