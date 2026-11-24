"use client";

import { useEffect, useRef } from "react";

// Roster names, titles and cyber terms woven into the stream (spelling kept exactly as supplied).
const TERMS = [
  "Noor Kasem", "Project Director", "Mindy Yun", "President", "Bryan Gonzalez",
  "VP_Infrastructure", "Andres Cota", "VP_Operations", "Lizzette Castro",
  "Social Media Director", "Aaron Adelentar", "Treasurer", "David Rincon III",
  "Tiago Borges", "Blue Team Captain", "Breach Team Support", "Chyan Giri",
  "Outreach Coordinator", "Architect", "Cyber", "CSULBreach", "CyberSecurity",
  "NCL", "CTF", "Algorithm", "Programming", "Malware", "Viruses",
  "Phishing Attack", "Firewall", "Encryption", "Incident Response", "IT Support",
  "Mr. Robot", "VPN", "Hacking", "Data Breach", "Artificial Intelligence",
  "Information Systems", "Computer Science", "Agentic", "Matrix",
  "Asymmetric Warfare", "Anonymous", "Blue Team", "OC2600", "Irvine Underground", "Tor",
];

const PALETTE = {
  primary: "#00FF41",
  secondary: "#00B82E",
  dim: "#004D13",
  head: "#E8FFE8",
  highlight: "#A6FFB8",
  glow: "rgba(0, 255, 65, 0.92)",
};

const FONT_SIZE = 18;
const ROW_HEIGHT = FONT_SIZE + 5;
const CHAR_W = Math.round(FONT_SIZE * 0.62);
const BUFFER = 35;

type Cell = { char: string; word: boolean };

function binaryChunk(min = 8, max = 20) {
  const len = Math.floor(Math.random() * (max - min + 1)) + min;
  let s = "";
  for (let i = 0; i < len; i++) s += Math.random() > 0.5 ? "1" : "0";
  return s;
}

function makeTermBag() {
  let bag: string[] = [];
  return () => {
    if (bag.length === 0) {
      bag = [...TERMS];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    return bag.pop() as string;
  };
}

class Row {
  y: number;
  speed: number;
  offsetX = -Math.random() * 300;
  wavePhase = Math.random() * Math.PI * 2;
  waveFreq = 0.0045 + Math.random() * 0.0045;
  waveSpeed: number;
  cells: Cell[] = [];
  lastWasWord = Math.random() > 0.5;

  constructor(index: number, y: number, private nextTerm: () => string, width: number) {
    this.y = y;
    this.speed = 42 + (index % 5) * 9 + Math.random() * 18;
    this.waveSpeed = (1.6 + Math.random() * 1.4) * (index % 2 === 0 ? 1 : -1);
    const target = Math.ceil(width / CHAR_W) + 60;
    while (this.cells.length < target) this.addSegment(true);
  }

  addSegment(toRight: boolean) {
    const useBinary = this.lastWasWord || Math.random() < 0.35;
    this.lastWasWord = !useBinary;
    const next: Cell[] = [];
    if (useBinary) {
      for (const c of binaryChunk()) next.push({ char: c, word: false });
    } else {
      const term = this.nextTerm();
      next.push({ char: " ", word: false });
      for (const c of term) next.push({ char: c, word: c !== " " });
      next.push({ char: " ", word: false });
    }
    if (toRight) this.cells.push(...next);
    else this.cells.unshift(...next);
  }

  // Flows left to right, like the reference design.
  update(dt: number, width: number) {
    this.offsetX += this.speed * dt;
    this.wavePhase += this.waveSpeed * dt;
    for (const cell of this.cells) {
      if (!cell.word && Math.random() < 0.004) cell.char = cell.char === "0" ? "1" : "0";
    }
    while (this.offsetX > -BUFFER * CHAR_W) {
      const before = this.cells.length;
      this.addSegment(false);
      this.offsetX -= (this.cells.length - before) * CHAR_W;
    }
    const max = Math.ceil(width / CHAR_W) + BUFFER * 2;
    if (this.cells.length > max) this.cells.length = max;
  }

  draw(ctx: CanvasRenderingContext2D, width: number) {
    const cy = this.y + ROW_HEIGHT * 0.5;
    ctx.fillStyle = "rgba(0, 255, 65, 0.06)";
    ctx.fillRect(0, this.y + ROW_HEIGHT - 1, width, 1);

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      const x = this.offsetX + i * CHAR_W + CHAR_W * 0.5;
      if (x < -CHAR_W || x > width + CHAR_W || cell.char === " ") continue;
      const wave = 0.5 + 0.5 * Math.sin(x * this.waveFreq + this.wavePhase);

      if (cell.word) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = PALETTE.head;
        ctx.shadowColor = PALETTE.glow;
        ctx.shadowBlur = 12;
        ctx.fillText(cell.char, x, cy);
        ctx.shadowBlur = 0;
      } else if (wave > 0.78) {
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = PALETTE.primary;
        ctx.fillText(cell.char, x, cy);
      } else if (wave > 0.35) {
        ctx.globalAlpha = 0.52 + (wave - 0.35) * 0.85;
        ctx.fillStyle = PALETTE.secondary;
        ctx.fillText(cell.char, x, cy);
      } else {
        ctx.globalAlpha = 0.28 + wave * 0.65;
        ctx.fillStyle = PALETTE.dim;
        ctx.fillText(cell.char, x, cy);
      }
    }
    ctx.globalAlpha = 1;
  }
}

// Full-screen Matrix digital rain behind the whole site. It only runs while the MDT theme is active.
export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rows: Row[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = performance.now();

    const fontFamily =
      getComputedStyle(document.body).getPropertyValue("--font-matrix").trim() || "monospace";

    function setup() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const nextTerm = makeTermBag();
      rows = Array.from(
        { length: Math.ceil(height / ROW_HEIGHT) },
        (_, r) => new Row(r, r * ROW_HEIGHT, nextTerm, width),
      );
    }

    function frame(dt: number) {
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, width, height);
      ctx!.font = `600 ${FONT_SIZE}px ${fontFamily}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const row of rows) {
        row.update(dt, width);
        row.draw(ctx!, width);
      }
    }

    const active = () => root.dataset.theme === "mdt" && !document.hidden;

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (active()) frame(dt);
    }

    setup();
    if (reduceMotion) {
      frame(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setup();
        if (reduceMotion) frame(0);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 hidden h-screen w-screen opacity-55 mdt:block"
      />
      {/* Dims the rain and adds CRT scanlines + vignette so page text stays readable */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden mdt:block"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 50%) 0 0 / 100% 4px, radial-gradient(circle at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </>
  );
}
