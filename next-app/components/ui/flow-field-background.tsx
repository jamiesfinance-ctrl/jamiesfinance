"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  color?: string;
  bgColor?: string;
  trailColor?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
}

export default function NeuralBackground({
  className,
  color = "#6366f1",
  bgColor = "black",
  trailColor,
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number; y: number; vx: number; vy: number; age: number; life: number;
      constructor() {
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.vx = 0; this.vy = 0; this.age = 0;
        this.life = Math.random() * 200 + 100;
      }
      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx -= dx * force * 0.05;
          this.vy -= dy * force * 0.05;
        }
        this.x += this.vx; this.y += this.vy;
        this.vx *= 0.95; this.vy *= 0.95;
        this.age++;
        if (this.age > this.life) this.reset();
        if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
      }
      reset() {
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.vx = 0; this.vy = 0; this.age = 0; this.life = Math.random() * 200 + 100;
      }
      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        context.globalAlpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;
        context.fillRect(this.x, this.y, 1.5, 1.5);
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const trail = trailColor ?? `rgba(0,0,0,${trailOpacity})`;
    const animate = () => {
      ctx.fillStyle = trail;
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(ctx); });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => { width = container.clientWidth; height = container.clientHeight; init(); };
    const handleMouseMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    // Re-init if container gains height after mount (e.g. CSS resolves late)
    const ro = new ResizeObserver(() => { handleResize(); });
    ro.observe(container);

    init(); animate();
    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, bgColor, trailColor, trailOpacity, particleCount, speed]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)} style={{ background: bgColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
