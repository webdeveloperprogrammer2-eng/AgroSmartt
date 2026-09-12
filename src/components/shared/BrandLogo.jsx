export default function BrandLogo({ className = "h-8 w-8" }) {
  return (
    <img
      src="/img/AgroSmartlogo-removebg-preview.png"
      alt="AgroSmart"
      draggable={false}
      className={`${className} select-none object-contain`}
    />
  );
}
