"use client";

import { Component } from "react";

// Хатоҳои боркунии модул (chunk) — вақте браузер нусхаи кӯҳнаи файлро
// дар хотир дорад, вале дар сервер он аллакай дигар шудааст. Дар ин ҳолат
// як бор худамон саҳифаро нав мекунем — ҳама чиз ба ҷояш меояд.
const RELOAD_FLAG = "agroChunkReload";

function isStaleModuleError(error) {
  const text = String(error?.message || error);
  return (
    text.includes("does not provide an export named") ||
    text.includes("Failed to fetch dynamically imported module") ||
    text.includes("error loading dynamically imported module") ||
    text.includes("Importing a module script failed")
  );
}

// Агар ягон саҳифа хато диҳад, React тамоми дарахтро мебандад ва
// экрани тамоман холӣ мемонад. Ин ҳудуд хаторо мегирад ва ба ҷои
// холигӣ паёми фаҳмо бо тугмаи навкунӣ нишон медиҳад.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Хатои саҳифа:", error, info);

    // Танҳо ЯК бор — вагарна ҳалқаи беохири навкунӣ пайдо мешуд
    if (isStaleModuleError(error) && !sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, "1");
      window.location.reload();
    }
  }

  componentDidMount() {
    // Саҳифа бе хато кушода шуд — иҷозати навкунии навбатиро бармегардонем
    sessionStorage.removeItem(RELOAD_FLAG);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="page-error">
        <h1>😕</h1>
        <p className="page-error-text">{String(this.state.error?.message || this.state.error)}</p>
        <button
          type="button"
          className="page-error-btn"
          onClick={() => {
            sessionStorage.removeItem(RELOAD_FLAG);
            window.location.reload();
          }}
        >
          ⟳
        </button>
      </div>
    );
  }
}
