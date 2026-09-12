"use client";

// Логотипи расмии AgroSmart.
// Пештар дар ҳар ҷо иконаи Sprout-и lucide (ниҳоли сабз) истода буд —
// ҳоло дар ҳамаи ҷойҳое, ки логотип бо навишти "AgroSmart" меистад,
// ҳамин як файл истифода мешавад, то бренд дар тамоми сайт якхела бошад.
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
