"use client";

import { useState, useEffect, useRef } from "react";
import { logPool, generateTimestampedLog, type LogEntry } from "@/lib/data/logs";

export function useLogStream(interval: number = 2000, maxLogs: number = 50) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    // Start with a few logs
    const initial = logPool.slice(0, 5).map(generateTimestampedLog);
    setLogs(initial);
    indexRef.current = 5;

    const timer = setInterval(() => {
      const nextLog = logPool[indexRef.current % logPool.length];
      indexRef.current++;

      setLogs((prev) => {
        const newLog = generateTimestampedLog(nextLog);
        const updated = [newLog, ...prev];
        return updated.slice(0, maxLogs);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, maxLogs]);

  return logs;
}
