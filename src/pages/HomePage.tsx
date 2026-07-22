import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { ChatWindow } from "../components/chat/ChatWindow";
import { Sidebar } from "../components/sidebar/Sidebar";
import { AppLayout } from "../layouts/AppLayout";

const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_DEFAULT_WIDTH = 272;

function getSidebarMaxWidth(): number {
  return Math.floor(window.innerWidth * 0.4);
}

export function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const clampWidth = () => {
      setSidebarWidth((current) =>
        Math.min(getSidebarMaxWidth(), Math.max(SIDEBAR_MIN_WIDTH, current)),
      );
    };

    clampWidth();
    window.addEventListener("resize", clampWidth);
    return () => window.removeEventListener("resize", clampWidth);
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
    };
  }, [isResizing]);

  const handleResizeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 767) {
      return;
    }

    event.preventDefault();
    const startX = event.clientX;
    const startWidth = sidebarWidth;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const nextWidth = startWidth + (moveEvent.clientX - startX);
      const maxWidth = getSidebarMaxWidth();
      setSidebarWidth(
        Math.min(maxWidth, Math.max(SIDEBAR_MIN_WIDTH, nextWidth)),
      );
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    setIsResizing(true);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const renderSidebar = () => (
    <Sidebar
      isOpen={isSidebarOpen}
      width={sidebarWidth}
      isResizing={isResizing}
      onClose={() => setIsSidebarOpen(false)}
      onResizeStart={handleResizeStart}
    />
  );

  const renderMain = () => (
    <ChatWindow
      isSidebarOpen={isSidebarOpen}
      onExpandSidebar={() => setIsSidebarOpen(true)}
    />
  );

  return <AppLayout sidebar={renderSidebar()} main={renderMain()} />;
}
