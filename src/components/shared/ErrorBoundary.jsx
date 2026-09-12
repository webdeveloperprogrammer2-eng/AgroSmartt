import { Component } from "react";

import { Frown } from "lucide-react";
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

    if (isStaleModuleError(error) && !sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, "1");
      window.location.reload();
    }
  }

  componentDidMount() {
    sessionStorage.removeItem(RELOAD_FLAG);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="page-error">
        <h1><Frown size={52} strokeWidth={1.7} /></h1>
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
