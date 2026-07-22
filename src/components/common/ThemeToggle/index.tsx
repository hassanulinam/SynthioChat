import { observer } from "mobx-react";

import { useUiStore } from "../../../stores/useStores";

import "./index.css";
import SunIcon from "../../../Icons/SunIcon";
import MoonIcon from "../../../Icons/MoonIcon";

export const ThemeToggle = observer(function ThemeToggle() {
  const uiStore = useUiStore();
  const { isDark } = uiStore;

  const renderIcon = () =>
    isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />;

  const renderLabel = () => (
    <span>{isDark ? "Light mode" : "Dark mode"}</span>
  );

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={
        uiStore.isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      onClick={() => uiStore.toggleTheme()}
    >
      {renderIcon()}
      {renderLabel()}
    </button>
  );
});
