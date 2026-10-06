import React, { useEffect, useRef } from 'react';

export default function CosmicCanvas({ mousePos }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Deep space stellar field
    const starCount = 200;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.3,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alpha: 0.5,
      depth: Math.random() * 0.9 + 0.1,
      color: Math.random() > 0.8 ? '#d8b4fe' : (Math.random() > 0.5 ? '#e0e7ff' : '#ffffff')
    }));

    // Large ethereal nebular cloud nodes
    const nebulaClouds = [
      { x: width * 0.45, y: height * 0.48, rx: 420, ry: 260, angle: -0.25, color: 'rgba(126, 75, 235, 0.18)' },
      { x: width * 0.58, y: height * 0.42, rx: 360, ry: 220, angle: 0.3, color: 'rgba(90, 40, 185, 0.14)' },
      { x: width * 0.3, y: height * 0.6, rx: 320, ry: 190, angle: -0.4, color: 'rgba(60, 20, 140, 0.12)' },
      { x: width * 0.72, y: height * 0.3, rx: 340, ry: 200, angle: 0.2, color: 'rgba(45, 15, 110, 0.12)' }
    ];

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Space Galactic Nebulae
      const pOffsetX = (mousePos.x - 0.5) * 30;
      const pOffsetY = (mousePos.y - 0.5) * 30;

      nebulaClouds.forEach((neb) => {
        ctx.save();
        ctx.translate(neb.x + pOffsetX * 0.3, neb.y + pOffsetY * 0.3);
        ctx.rotate(neb.angle);
        ctx.scale(1, neb.ry / neb.rx);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, neb.rx);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(0.5, neb.color.replace(/[\d\.]+\)$/, '0.06)'));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, neb.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Render Twinkling Stars with Mouse Parallax
      stars.forEach((star) => {
        star.alpha = star.baseAlpha + Math.sin(time * 2.5 + star.x) * 0.25;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;

        const posX = star.x + pOffsetX * star.depth;
        const posY = star.y + pOffsetY * star.depth;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Lens flare on luminous stars
        if (star.size > 1.5) {
          ctx.fillStyle = 'rgba(216, 180, 254, 0.35)';
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
