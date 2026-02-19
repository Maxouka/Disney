"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypewriter(
  text: string,
  speed: number = 30,
  startDelay: number = 0,
  enabled: boolean = true
) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayed("");
    setIsDone(false);

    const delayTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, startDelay, enabled]);

  const skip = useCallback(() => {
    setDisplayed(text);
    setIsDone(true);
  }, [text]);

  return { displayed, isDone, skip };
}
