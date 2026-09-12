import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Лоиҳа дар дохили ҷузвдони версияи React ҷойгир аст — ба Next мегӯем,
  // ки решаи худи ҳамин ҷузвдонро гирад ва lockfile-и берунаро нагирад.
  outputFileTracingRoot: path.resolve("."),
};

export default nextConfig;
