import { useEffect, useRef } from 'react';

export default function TechCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 3D Nodes for floating polyhedra
    const NODE_COUNT = 40;
    interface Node3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseRadius: number;
    }

    const nodes: Node3D[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 400 + 100,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.4,
        baseRadius: Math.random() * 2 + 2,
      });
    }

    const fov = 350;
    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle rotation
      angleX += 0.001;
      angleY += 0.0015;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project nodes
      const projected = nodes.map(node => {
        // Update positions
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        if (node.x < -width / 2) node.x = width / 2;
        if (node.x > width / 2) node.x = -width / 2;
        if (node.y < -height / 2) node.y = height / 2;
        if (node.y > height / 2) node.y = -height / 2;
        if (node.z < 100) node.z = 500;
        if (node.z > 500) node.z = 100;

        // 3D Rotation
        let rx = node.x * cosY - node.z * sinY;
        let rz = node.z * cosY + node.x * sinY;
        let ry = node.y * cosX - rz * sinX;
        rz = rz * cosX + node.y * sinX;

        // Mouse influence
        if (mouse.active) {
          const dx = rx + width / 2 - mouse.x;
          const dy = ry + height / 2 - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            rx += (dx / dist) * 12;
            ry += (dy / dist) * 12;
          }
        }

        const scale = fov / (fov + rz);
        const px = rx * scale + width / 2;
        const py = ry * scale + height / 2;
        const radius = Math.max(1, node.baseRadius * scale);

        return { px, py, radius, scale, z: rz };
      });

      // Draw connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.3 * ((p1.scale + p2.scale) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 94, 20, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.px < -20 || p.px > width + 20 || p.py < -20 || p.py > height + 20) continue;

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? '#FF5E14' : i % 5 === 0 ? '#FFA048' : '#FFFFFF';
        ctx.shadowColor = '#FF5E14';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70"
      aria-hidden="true"
    />
  );
}
