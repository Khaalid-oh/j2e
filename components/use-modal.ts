"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

// Native dialogs provide focus containment, Escape and an inert background.
export function useModal(dialog: RefObject<HTMLDialogElement | null>) {
  const trigger = useRef<HTMLElement | null>(null);
  const scrollState = useRef<{ overflow: string; paddingRight: string } | null>(
    null,
  );
  const restore = useCallback(() => {
    if (scrollState.current) {
      document.body.style.overflow = scrollState.current.overflow;
      document.body.style.paddingRight = scrollState.current.paddingRight;
      scrollState.current = null;
    }
    trigger.current?.focus({ preventScroll: true });
    trigger.current = null;
  }, []);
  function open() {
    if (!dialog.current || dialog.current.open) return;
    trigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    scrollState.current = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    dialog.current.showModal();
  }
  function close() {
    dialog.current?.close();
    restore();
  }
  useEffect(() => {
    const element = dialog.current;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !element?.open) return;
      const controls = [
        ...element.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], iframe, [tabindex="0"]',
        ),
      ].filter((control) => control.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    element?.addEventListener("keydown", trapFocus);
    return () => {
      element?.removeEventListener("keydown", trapFocus);
      restore();
    };
  }, [dialog, restore]);
  return { open, close };
}
