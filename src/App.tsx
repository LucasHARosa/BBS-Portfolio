import {
  Clock,
  Globe,
  HelpCircle,
  Mail,
  RefreshCw,
  Terminal as TerminalIcon,
  User,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "./data/projects";

type LineVariant =
  | "normal"
  | "accent"
  | "muted"
  | "error"
  | "success"
  | "warning"
  | "info";

interface TerminalLine {
  id: string;
  text: string;
  variant?: LineVariant;
  isInstant?: boolean;
}

type QueueAction =
  | {
      type: "line";
      text: string;
      variant?: LineVariant;
      speed?: number;
      instant?: boolean;
    }
  | { type: "pause"; ms: number }
  | { type: "clear" }
  | { type: "boot_complete" };

const COMMANDS = [
  "HOME",
  "PORTFOLIO",
  "ABOUT",
  "UPTIME",
  "CONTACT",
  "HELP",
  "CLEAR",
  "THEME",
  "SOUND",
];

const THEMES = {
  aizen: { bg: "#1c1c1c", fg: "#b2b2b2", accent: "#7bb531" },
  green: { bg: "#0a0a0a", fg: "#00ff41", accent: "#00ff41" },
  amber: { bg: "#0a0a0a", fg: "#ffb000", accent: "#ffb000" },
  blue: { bg: "#000b1e", fg: "#00d0ff", accent: "#00d0ff" },
};

export default function App() {
  const [output, setOutput] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof THEMES>("aizen");
  const [soundEnabled, setSoundEnabled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<QueueAction[]>([]);
  const bootStartedRef = useRef(false);

  const addLine = useCallback(
    (text: string, variant: LineVariant = "normal", isInstant = false) => {
      const id = Math.random().toString(36).substring(7);
      setOutput((prev) => [...prev, { id, text, variant, isInstant }]);
    },
    [],
  );

  const processQueue = useCallback(async () => {
    if (isTyping || queueRef.current.length === 0) return;

    setIsTyping(true);
    const action = queueRef.current.shift();
    if (!action) {
      setIsTyping(false);
      return;
    }

    if (action.type === "line") {
      if (action.instant) {
        addLine(action.text, action.variant, true);
      } else {
        const id = Math.random().toString(36).substring(7);
        let displayedText = "";

        setOutput((prev) => [
          ...prev,
          { id, text: "", variant: action.variant },
        ]);

        for (let i = 0; i <= action.text.length; i++) {
          displayedText = action.text.substring(0, i);
          setOutput((prev) =>
            prev.map((line) =>
              line.id === id ? { ...line, text: displayedText } : line,
            ),
          );
          await new Promise((r) => setTimeout(r, action.speed || 20));
        }
      }
    } else if (action.type === "pause") {
      await new Promise((r) => setTimeout(r, action.ms));
    } else if (action.type === "clear") {
      setOutput([]);
    } else if (action.type === "boot_complete") {
      setIsBooting(false);
    }

    setIsTyping(false);
    processQueue();
  }, [isTyping, addLine]);

  const enqueue = (items: QueueAction[]) => {
    queueRef.current.push(...items);
    processQueue();
  };

  useEffect(() => {
    if (bootStartedRef.current) return;
    bootStartedRef.current = true;

    const bootLines: QueueAction[] = [
      {
        type: "line",
        text: "establishing secure session...",
        variant: "muted",
        speed: 30,
      },
      { type: "pause", ms: 400 },
      {
        type: "line",
        text: `theme: Aizen Dark `,
        variant: "info",
        speed: 10,
      },
      {
        type: "line",
        text: "terminal: vt-220 | cols: 100 | rows: 30",
        variant: "muted",
        speed: 10,
      },
      {
        type: "line",
        text: "loading modules: Theme, Portfolio, Contact, Uptime, About, Help",
        variant: "muted",
        speed: 10,
      },
      { type: "pause", ms: 300 },
      {
        type: "line",
        text: "\nPUBLIC.LUCASROSA.2.4.0 LOADING...",
        variant: "muted",
        speed: 10,
      },
      { type: "pause", ms: 1000 },
      {
        type: "line",
        text: "PUBLIC.LUCASROSA.2.4.0 OK!",
        variant: "success",
        speed: 10,
      },
      { type: "pause", ms: 200 },
      // {
      //   type: "line",
      //   text: "--------------------------------------------------",
      //   variant: "muted",
      //   instant: true,
      // },
      {
        type: "line",
        text: "\nWELCOME TO LUCAS ROSA PORTFOLIO v2.4.0",
        variant: "accent",
        speed: 30,
      },
      {
        type: "line",
        text: "TYPE OR CLICK 'HOME' TO START\n",
        variant: "muted",
        speed: 30,
      },
      // {
      //   type: "line",
      //   text: "--------------------------------------------------",
      //   variant: "muted",
      //   instant: true,
      // },
      { type: "boot_complete" },
    ];

    enqueue(bootLines);

    return () => {};
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    scrollToBottom();
    const timeout = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timeout);
  }, [output, isTyping]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const [command, ...args] = trimmed.split(" ");

    if (command !== "clear") {
      enqueue([{ type: "clear" }]);
    }

    switch (command) {
      case "clear":
        setOutput([]);
        break;
      case "help":
      case "home":
        enqueue([
          {
            type: "line",
            text: "AVAILABLE COMMANDS:",
            variant: "info",
            instant: true,
          },
          {
            type: "line",
            text: "PORTFOLIO".padEnd(20) + "RECENT WORKS",
            variant: "accent",
            speed: 8,
          },
          {
            type: "line",
            text: "ABOUT".padEnd(20) + "ABOUT US",
            variant: "accent",
            speed: 8,
          },
          {
            type: "line",
            text: "UPTIME".padEnd(20) + "UPTIME STATUS",
            variant: "accent",
            speed: 8,
          },
          {
            type: "line",
            text: "CONTACT".padEnd(20) + "EMAILS/LINKS",
            variant: "accent",
            speed: 8,
          },
          {
            type: "line",
            text: "THEME".padEnd(20) + "CHANGE THEME",
            variant: "accent",
            speed: 8,
          },
          {
            type: "line",
            text: "CLEAR".padEnd(20) + "CLEAR SCREEN",
            variant: "accent",
            speed: 8,
          },
          {
            type: "line",
            text: "HELP".padEnd(20) + "SHOW HELP",
            variant: "accent",
            speed: 8,
          },
          { type: "pause", ms: 200 },
          {
            type: "line",
            text: "\nINPUT OR CLICK 'HOME' TO LIST AVAILABLE COMMANDS.",
            variant: "muted",
            instant: true,
          },
        ]);
        break;
      case "portfolio":
        const page = parseInt(args[0]) || 1;
        const isMobile = window.innerWidth < 640;
        const pageSize = isMobile ? 4 : 8;
        const startIndex = (page - 1) * pageSize;
        const pageProjects = projects.slice(startIndex, startIndex + pageSize);
        const totalPages = Math.ceil(projects.length / pageSize);

        const portfolioLines: QueueAction[] = [
          {
            type: "line",
            text: `PORTFOLIO PAGE ${page}:`,
            variant: "info",
            instant: true,
          },
        ];

        pageProjects.forEach((p, idx) => {
          const displayIdx = startIndex + idx + 1;
          if (isMobile) {
            portfolioLines.push({
              type: "line",
              text: `${displayIdx.toString().padStart(2, "0")}  ${p.titulo}`,
              variant: "accent",
              speed: 6,
            });
            portfolioLines.push({
              type: "line",
              text: `    ${p.tags[0]}`,
              variant: "accent",
              instant: true,
            });
          } else {
            portfolioLines.push({
              type: "line",
              text: `${displayIdx.toString().padStart(2, "0")}  ${p.titulo.padEnd(36)} ${p.tags[0]}`,
              variant: "accent",
              speed: 6,
            });
          }
        });

        let pagesText = "PAGES ";
        for (let i = 1; i <= totalPages; i++) {
          pagesText += `${i} ${i < totalPages ? "| " : ""}`;
        }
        portfolioLines.push({
          type: "line",
          text: "\n" + pagesText,
          variant: "muted",
          instant: true,
        });
        portfolioLines.push({
          type: "line",
          text: '\nTYPE "VIEW <PROJECT_ID>" TO SEE PROJECT DETAILS.',
          variant: "muted",
          instant: true,
        });
        portfolioLines.push({
          type: "line",
          text: "INPUT OR CLICK 'HOME' TO LIST AVAILABLE COMMANDS.",
          variant: "muted",
          instant: true,
        });

        enqueue(portfolioLines);
        break;
      case "view":
        const search = args.join(" ").toLowerCase();
        const searchIdx = parseInt(search);
        const project = projects.find(
          (p, idx) =>
            (!isNaN(searchIdx) && idx + 1 === searchIdx) ||
            p.id.toString() === search ||
            p.titulo.toLowerCase() === search,
        );
        if (project) {
          enqueue([
            {
              type: "line",
              text: `>> PROJECT: ${project.titulo}`,
              variant: "accent",
              speed: 20,
            },
            {
              type: "line",
              text: `DESCRIPTION: ${project.descricao}`,
              speed: 10,
            },
            {
              type: "line",
              text: `STACK: ${project.tags.join(", ")}`,
              variant: "info",
              instant: true,
            },
            {
              type: "line",
              text: `LINKS: ${project.Link ? `[DEMO: ${project.Link}] ` : ""}${project.LinkGit ? `[GIT: ${project.LinkGit}]` : ""}`,
              variant: "success",
              instant: true,
            },
            {
              type: "line",
              text: "\nTYPE 'PORTFOLIO' TO GO BACK.",
              variant: "muted",
              instant: true,
            },
          ]);
        } else {
          addLine(`Project '${search}' not found.`, "error");
        }
        break;
      case "about":
        enqueue([
          { type: "line", text: "ABOUT ME", variant: "accent", speed: 30 },
          {
            type: "line",
            text: "Full-stack developer with a passion for building robust and scalable applications.",
            speed: 10,
          },
          {
            type: "line",
            text: "Specialized in React, TypeScript, and Node.js ecosystems.",
            speed: 10,
          },
          {
            type: "line",
            text: "Currently focused on creating immersive web experiences and high-performance mobile apps.",
            speed: 10,
          },
          {
            type: "line",
            text: "\nINPUT OR CLICK 'HOME' TO LIST AVAILABLE COMMANDS.",
            variant: "muted",
            instant: true,
          },
        ]);
        break;
      case "uptime": {
        const now = new Date();
        const startDate = new Date("2026-02-28T19:28:00");
        const diffMs = now.getTime() - startDate.getTime();
        const uptimeDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const uptimeHours = Math.floor(
          (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const uptimeMinutes = Math.floor(
          (diffMs % (1000 * 60 * 60)) / (1000 * 60),
        );
        const uptimeSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        const uptimeStr = `${uptimeDays} days, ${String(uptimeHours).padStart(2, "0")}:${String(uptimeMinutes).padStart(2, "0")}:${String(uptimeSeconds).padStart(2, "0")}`;
        enqueue([
          {
            type: "line",
            text: `SYSTEM STATUS: ONLINE`,
            variant: "success",
            speed: 20,
          },
          {
            type: "line",
            text: `UPTIME: ${uptimeStr}`,
            speed: 10,
          },
          {
            type: "line",
            text: `LOCAL TIME: ${now.toLocaleTimeString()} ${now.toLocaleDateString()}`,
            speed: 10,
          },
          { type: "line", text: `LOCATION: Brazil/Brasilia`, speed: 10 },
          {
            type: "line",
            text: "\nINPUT OR CLICK 'HOME' TO LIST AVAILABLE COMMANDS.",
            variant: "muted",
            instant: true,
          },
        ]);
        break;
      }
      case "contact":
        enqueue([
          {
            type: "line",
            text: "CONTACT INFORMATION",
            variant: "accent",
            speed: 20,
          },
          {
            type: "line",
            text: "Email: lucashrosa99@gmail.com",
            variant: "info",
            speed: 10,
          },
          {
            type: "line",
            text: "LinkedIn: linkedin.com/in/lucas-henrique-alves-rosa/",
            variant: "info",
            speed: 10,
          },
          {
            type: "line",
            text: "Portfolio: lucasrosa.dev.br",
            variant: "info",
            speed: 10,
          },
          {
            type: "line",
            text: "\nINPUT OR CLICK 'HOME' TO LIST AVAILABLE COMMANDS.",
            variant: "muted",
            instant: true,
          },
        ]);
        break;
      case "theme":
        const themeName = args[0] as keyof typeof THEMES;
        if (args.length === 0) {
          enqueue([
            {
              type: "line",
              text: "AVAILABLE THEMES:",
              variant: "info",
              instant: true,
            },
            {
              type: "line",
              text: "AIZEN".padEnd(15) + "DEFAULT DARK",
              variant: "accent",
              speed: 10,
            },
            {
              type: "line",
              text: "GREEN".padEnd(15) + "MATRIX STYLE",
              variant: "accent",
              speed: 10,
            },
            {
              type: "line",
              text: "AMBER".padEnd(15) + "RETRO CRT",
              variant: "accent",
              speed: 10,
            },
            {
              type: "line",
              text: "BLUE".padEnd(15) + "CYBERPUNK",
              variant: "accent",
              speed: 10,
            },
            {
              type: "line",
              text: "\nUSAGE: THEME <NAME>",
              variant: "muted",
              instant: true,
            },
          ]);
        } else if (THEMES[themeName]) {
          setCurrentTheme(themeName);
          addLine(`Theme changed to ${themeName}.`, "success");
        } else {
          addLine(
            `Theme '${args[0]}' not found. Available: aizen, green, amber, blue`,
            "error",
          );
        }
        break;
      case "":
        break;
      default:
        addLine(`command not found: ${command}`, "error");
        break;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input) {
        handleCommand(input);
        setHistory((prev) => [input, ...prev]);
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = COMMANDS.filter((c) =>
        c.toLowerCase().startsWith(input.toLowerCase()),
      );
      if (matches.length === 1) {
        setInput(matches[0].toLowerCase());
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getLineClass = (variant?: LineVariant) => {
    switch (variant) {
      case "accent":
        return "text-aizen-yellow font-bold";
      case "muted":
        return "text-aizen-fg opacity-80";
      case "error":
        return "text-aizen-red";
      case "success":
        return "text-aizen-green";
      case "warning":
        return "text-aizen-yellow";
      case "info":
        return "text-aizen-cyan";
      default:
        return "text-aizen-fg";
    }
  };

  const renderLineContent = (line: TerminalLine) => {
    const text = line.text;

    if (text.includes("PAGES ")) {
      const parts = text.split(" ");
      return (
        <span>
          {parts.map((part, i) => {
            const num = parseInt(part);
            if (!isNaN(num)) {
              return (
                <React.Fragment key={i}>
                  <span
                    className="underline cursor-pointer hover:text-aizen-green"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommand(`portfolio ${num}`);
                    }}
                  >
                    {part}
                  </span>
                  {i < parts.length - 1 ? " " : ""}
                </React.Fragment>
              );
            }
            return <span key={i}>{part} </span>;
          })}
        </span>
      );
    }

    let elements: React.ReactNode[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      let matchFound = false;

      const tagMatch = remainingText.match(
        /^(\s{2,})(WEB[|/]APP|WEB|APP|MOBILE|API|FULLSTACK|SHOP)/i,
      );
      if (tagMatch) {
        const spaces = tagMatch[1];
        const tag = tagMatch[2];
        elements.push(spaces);
        elements.push(
          <span key={elements.length} className="text-gray-400 italic">
            {tag}
          </span>,
        );
        remainingText = remainingText.substring(tagMatch[0].length);
        matchFound = true;
      }

      if (matchFound) continue;

      const indexMatch = remainingText.match(/^(\d{2})(\s{2})/);
      if (indexMatch) {
        const idxStr = indexMatch[1];
        const spaces = indexMatch[2];
        elements.push(
          <span
            key={elements.length}
            className="underline decoration-1 underline-offset-4 cursor-pointer hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(`view ${idxStr}`);
            }}
          >
            {idxStr}
          </span>,
        );
        elements.push(spaces);
        remainingText = remainingText.substring(indexMatch[0].length);
        matchFound = true;
      }

      if (matchFound) continue;

      const sortedProjects = [...projects].sort(
        (a, b) => b.titulo.length - a.titulo.length,
      );
      for (const project of sortedProjects) {
        const title = project.titulo;
        const index = remainingText.toLowerCase().indexOf(title.toLowerCase());
        if (index === 0) {
          const matchText = remainingText.substring(0, title.length);
          elements.push(
            <span
              key={elements.length}
              className="underline decoration-1 underline-offset-4 cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                if (project.Link) {
                  window.open(project.Link, "_blank", "noopener,noreferrer");
                } else {
                  handleCommand(`view ${project.titulo}`);
                }
              }}
            >
              {matchText}
            </span>,
          );
          remainingText = remainingText.substring(title.length);
          matchFound = true;
          break;
        }
      }

      if (matchFound) continue;

      const sortedCommands = [...COMMANDS].sort((a, b) => b.length - a.length);
      for (const cmd of sortedCommands) {
        const index = remainingText.toUpperCase().indexOf(cmd);
        if (index === 0) {
          const matchText = remainingText.substring(0, cmd.length);
          elements.push(
            <span
              key={elements.length}
              className="underline decoration-1 underline-offset-4 cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                handleCommand(cmd);
              }}
            >
              {matchText}
            </span>,
          );
          remainingText = remainingText.substring(cmd.length);
          matchFound = true;
          break;
        }
      }

      if (matchFound) continue;

      elements.push(remainingText[0]);
      remainingText = remainingText.substring(1);
    }

    return <span>{elements}</span>;
  };

  return (
    <div
      className="h-screen w-full flex flex-col p-3 sm:p-6 md:p-12 relative overflow-hidden"
      style={{
        backgroundColor: THEMES[currentTheme].bg,
        color: THEMES[currentTheme].fg,
      }}
      onClick={focusInput}
    >
      <div className="crt-overlay" />
      <div className="crt-vignette" />
      <div className="scanline" />
      <div className="terminal-grid" />

      <header className="flex justify-between items-center mb-4 sm:mb-8 border-b border-white/10 pb-3 sm:pb-4 z-10">
        <div className="flex items-center gap-3">
          <TerminalIcon size={24} className="text-aizen-green" />
          <span className="text-lg tracking-widest uppercase opacity-70">
            Lucas_Rosa@Portfolio: ~
          </span>
        </div>
        <div className="flex gap-6 text-sm opacity-50 uppercase tracking-tighter">
          <span className="hidden sm:inline">VT-220 EMULATION</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto min-h-0 z-10 scroll-smooth pr-4 crt-flicker mb-4"
      >
        <div className="space-y-2">
          {output.map((line) => (
            <div
              key={line.id}
              className={`whitespace-pre-wrap ${getLineClass(line.variant)}`}
            >
              {renderLineContent(line)}
            </div>
          ))}

          {!isBooting && (
            <div className="flex items-center gap-3 pt-4">
              <span className="text-aizen-green font-bold">$</span>
              <div className="relative flex-1 ">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoFocus
                  className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-aizen-fg caret-transparent cursor-none"
                  spellCheck={false}
                  autoComplete="off"
                />
                <div
                  className="absolute inset-0 pointer-events-none flex items-center"
                  style={{ color: THEMES[currentTheme].fg }}
                >
                  <span>{input}</span>
                  <span className="w-[1ch] h-[1em] bg-current ml-[1px] cursor-blink" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {!isBooting && (
        <footer className="z-10 border-t border-white/10 pt-6 mt-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
            {[
              { name: "HOME", icon: <RefreshCw size={14} /> },
              { name: "PORTFOLIO", icon: <Globe size={14} /> },
              { name: "ABOUT", icon: <User size={14} /> },
              { name: "UPTIME", icon: <Clock size={14} /> },
              { name: "CONTACT", icon: <Mail size={14} /> },
              { name: "HELP", icon: <HelpCircle size={14} /> },
              { name: "CLEAR", icon: <RefreshCw size={14} /> },
            ].map((item) => (
              <button
                key={item.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(item.name);
                }}
                className="flex items-center flex-1 gap-2 px-3 py-1.5 border border-white/10 hover:border-aizen-green hover:text-aizen-green transition-all cursor-pointer text-[10px] md:text-xs tracking-widest opacity-80 hover:opacity-100 bg-black/20"
              >
                <span className="opacity-70">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </footer>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --aizen-bg: ${THEMES[currentTheme].bg};
          --aizen-fg: ${THEMES[currentTheme].fg};
          --aizen-accent: ${THEMES[currentTheme].accent};
        }
        .text-aizen-fg { color: ${THEMES[currentTheme].fg}; }
        .text-aizen-green { color: ${THEMES[currentTheme].accent}; }
        .text-aizen-yellow { color: ${currentTheme === "aizen" ? "#db7b0d" : THEMES[currentTheme].accent}; }
        .text-aizen-red { color: ${currentTheme === "aizen" ? "#e84c32" : THEMES[currentTheme].fg}; }
        .text-aizen-cyan { color: ${currentTheme === "aizen" ? "#00FFFF" : THEMES[currentTheme].accent}; }
      `,
        }}
      />
    </div>
  );
}
