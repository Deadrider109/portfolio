
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 22;

export default function CursorTrail() {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const mouse = { x: -500, y: -500, active: false };
    let animationFrame;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement("span");
      particle.className = "cursor-particle";
      container.appendChild(particle);

      particles.push({
        element: particle,
        x: -500,
        y: -500,
        vx: 0,
        vy: 0,
        size: Math.max(3, 13 - i * 0.42),
        delay: 0.12 + i * 0.008
      });
    }

    particlesRef.current = particles;

    const handleMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const handleLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      let targetX = mouse.x;
      let targetY = mouse.y;

      particles.forEach((particle, index) => {
        const dx = targetX - particle.x;
        const dy = targetY - particle.y;

        particle.vx += dx * particle.delay;
        particle.vy += dy * particle.delay;

        particle.vx *= 0.72;
        particle.vy *= 0.72;

        particle.x += particle.vx;
        particle.y += particle.vy;

        const scale = 1 - index / PARTICLE_COUNT;

        particle.element.style.transform =
          `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        particle.element.style.opacity = mouse.active
          ? String(0.75 * scale)
          : "0";

        targetX = particle.x;
        targetY = particle.y;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    animate();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animationFrame);
      particles.forEach(p => p.element.remove());
    };
  }, []);

  return <div className="cursor-trail" ref={containerRef} aria-hidden="true" />;
}
