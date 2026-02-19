"use client";

import { useState, useCallback, useRef } from "react";
import { processCommand } from "@/components/terminal/commands";

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  color?: string;
}

let lineCounter = 0;
function nextId(): string {
  return `line-${++lineCounter}-${Date.now()}`;
}

function createWelcomeLines(): TerminalLine[] {
  return [
    {
      id: nextId(),
      type: "system",
      content: "",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ╔══════════════════════════════════════════════════════════════╗",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ║                                                            ║",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ║   *:. DISNEY CYBER TERMINAL v1.0                          ║",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ║   Candidature Ingenieur Cybersecurite — Disneyland Paris   ║",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ║                                                            ║",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ║   Maxime LAUNOY — INSA Cybersecurite                      ║",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ║                                                            ║",
    },
    {
      id: nextId(),
      type: "system",
      content:
        "  ╚══════════════════════════════════════════════════════════════╝",
    },
    {
      id: nextId(),
      type: "system",
      content: "",
    },
    {
      id: nextId(),
      type: "output",
      content: '  Tapez "help" pour afficher la liste des commandes disponibles.',
      color: "cyber-green",
    },
    {
      id: nextId(),
      type: "system",
      content: "",
    },
  ];
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(createWelcomeLines);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const tempInputRef = useRef("");

  const clearTerminal = useCallback(() => {
    setLines(createWelcomeLines());
  }, []);

  const submitCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      // Add to command history
      setCommandHistory((prev) => [trimmed, ...prev]);
      setHistoryIndex(-1);
      tempInputRef.current = "";

      // Create input line
      const inputLine: TerminalLine = {
        id: nextId(),
        type: "input",
        content: trimmed,
      };

      // Handle clear specially
      if (trimmed.toLowerCase() === "clear") {
        clearTerminal();
        setCurrentInput("");
        return;
      }

      // Process command
      const outputLines = processCommand(trimmed);

      setLines((prev) => [...prev, inputLine, ...outputLines]);
      setCurrentInput("");
    },
    [clearTerminal]
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (commandHistory.length === 0) return;

      if (direction === "up") {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          if (historyIndex === -1) {
            tempInputRef.current = currentInput;
          }
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      } else {
        const newIndex = historyIndex - 1;
        if (newIndex >= 0) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        } else if (newIndex === -1) {
          setHistoryIndex(-1);
          setCurrentInput(tempInputRef.current);
        }
      }
    },
    [commandHistory, historyIndex, currentInput]
  );

  return {
    lines,
    currentInput,
    setCurrentInput,
    submitCommand,
    clearTerminal,
    commandHistory,
    historyIndex,
    navigateHistory,
  };
}
