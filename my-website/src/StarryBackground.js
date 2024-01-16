import React, { useRef, useEffect } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = createStars(100, canvas.width, canvas.height);

    const moveStars = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      stars.forEach(star => {
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 10) {
          const angle = Math.atan2(dy, dx);
          star.x += Math.cos(angle);
          star.y += Math.sin(angle);
        }
      });
      drawStars(ctx, stars);
    };

    canvas.addEventListener('mousemove', moveStars);
    drawStars(ctx, stars);

    return () => {
      canvas.removeEventListener('mousemove', moveStars);
    };
  }, []);

  const createStars = (count, width, height) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 0.15 + 1;
      const opacity = Math.random() * 0.5; 
      stars.push({ x, y, size, opacity });
    }
    return stars;
  };
  

  const drawStars = (ctx, stars) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
  };
  

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
};

export default StarryBackground;
