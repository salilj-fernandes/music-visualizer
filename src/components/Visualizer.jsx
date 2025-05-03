import React, { useRef, useEffect } from "react";

function Visualizer({ song }) {
  const audioRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    if (!song?.previewUrl) return;
    console.log(song);
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.src = song.previewUrl;
    audioRef.current = audio;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const animate = () => {
      requestAnimationFrame(animate);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const centerX = WIDTH / 2;
      const centerY = HEIGHT / 2;
      const radius = 90;

      const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      gradient.addColorStop(0, "#cf9cff");
      gradient.addColorStop(1, "#e2cbf7");

      for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * Math.PI * 2;
        const barHeight = dataArray[i];

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const xEnd = centerX + Math.cos(angle) * (radius + barHeight / 2);
        const yEnd = centerY + Math.sin(angle) * (radius + barHeight / 2);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xEnd, yEnd);
        ctx.strokeStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    // Wait until audio can play
    audio.addEventListener("canplaythrough", () => {
      audio.play().catch((e) => {
        console.warn("Play error:", e);
      });
      animate();
    });

    return () => {
      audio.pause();
      audioContext.close();
    };
  }, [song]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 className="song">
        Now Playing: <i>{song.trackName}</i> by <i>{song.artistName}</i>
      </h2>
      <canvas
        ref={canvasRef}
        width="1000"
        height="500"
        style={{ backgroundColor: "#111" }}
      />
    </div>
  );
}

export default Visualizer;
