"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { Icon } from "./icon";

export function SearchBox({
  defaultValue = "",
  alwaysVisible = false,
}: {
  defaultValue?: string;
  alwaysVisible?: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = new FormData(event.currentTarget).get("q");
    if (typeof q === "string" && q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        alwaysVisible
          ? "flex w-full min-w-0 items-center"
          : "hidden min-w-0 w-full max-w-xl flex-1 items-center md:flex"
      }
    >
      <label className="flex w-full min-w-0 items-center border border-outline-variant bg-surface-container-low px-space-sm py-space-xs">
        <Icon name="search" className="mr-space-xs shrink-0 text-[18px] text-outline" />
        <input
          ref={inputRef}
          name="q"
          defaultValue={defaultValue}
          className="min-w-0 w-full border-none bg-transparent font-body-sm text-body-sm text-on-surface outline-none placeholder:text-outline-variant"
          placeholder="Search headlines, sources, and deep reads"
          type="search"
        />
        <kbd className="ml-space-xs hidden shrink-0 border border-outline-variant bg-surface-container-high px-1.5 py-0.5 font-label-caps text-label-caps text-on-surface-variant lg:inline">
          ⌘K
        </kbd>
      </label>
    </form>
  );
}
