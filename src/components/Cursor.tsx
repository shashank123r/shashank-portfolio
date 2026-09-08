import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const TRAIL_LIFETIME = 1000; // ms for the tail end to catch up once the pointer stops
const MAX_POINTS = 90;

const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: width / 2, y: height / 2 };
    let hasMoved = false;
    let disabled = false;
    let trail: { x: number; y: number; t: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hasMoved = true;
    };
    document.addEventListener("mousemove", onMouseMove);

    const disableEls = Array.from(
      document.querySelectorAll('[data-cursor="disable"]')
    ) as HTMLElement[];
    const onOver = () => {
      disabled = true;
    };
    const onOut = () => {
      disabled = false;
    };
    disableEls.forEach((el) => {
      el.addEventListener("mouseover", onOver);
      el.addEventListener("mouseout", onOut);
    });

    let rafId: number;
    const loop = () => {
      const now = performance.now();

      if (hasMoved && !disabled) {
        trail.push({ x: mouse.x, y: mouse.y, t: now });
      }
      trail = trail
        .filter((p) => now - p.t < TRAIL_LIFETIME)
        .slice(-MAX_POINTS);

      ctx.clearRect(0, 0, width, height);

      if (trail.length > 2) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgb(245, 158, 11)";
        ctx.shadowBlur = 14;
        ctx.strokeStyle = "#fbbf24";
        for (let i = 1; i < trail.length - 1; i++) {
          const prev = trail[i - 1];
          const curr = trail[i];
          const next = trail[i + 1];
          const start = { x: (prev.x + curr.x) / 2, y: (prev.y + curr.y) / 2 };
          const end = { x: (curr.x + next.x) / 2, y: (curr.y + next.y) / 2 };
          const age = i / trail.length; // 0 = tail (old), 1 = head (new)
          ctx.globalAlpha = age;
          ctx.lineWidth = 1 + age * 7;
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.quadraticCurveTo(curr.x, curr.y, end.x, end.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      disableEls.forEach((el) => {
        el.removeEventListener("mouseover", onOver);
        el.removeEventListener("mouseout", onOut);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas className="cursor-main" ref={canvasRef}></canvas>;
};

export default Cursor;
