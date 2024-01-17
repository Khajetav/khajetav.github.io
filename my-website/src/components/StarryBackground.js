import React, { useRef, useEffect } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let stars = createStars(100, canvas.width, canvas.height);

        let animationFrameId;

        const animate = (time) => {
            stars.forEach(star => {
                star.currentOpacity = star.baseOpacity + Math.sin(time * star.pulsationSpeed) * star.baseOpacity;
            });

            drawStars(ctx, stars);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    const createStars = (count, width, height) => {
        let stars = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 0.15 + 1;
            const baseOpacity = Math.random() * 0.5;
            const pulsationSpeed = Math.random() * 0.0025;
            stars.push({ x, y, size, baseOpacity, pulsationSpeed, currentOpacity: baseOpacity });
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
            ctx.fillStyle = `rgba(255, 255, 255, ${star.currentOpacity})`;
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
