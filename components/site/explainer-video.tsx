'use client';

import { useRef, useState } from 'react';

export function ExplainerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/vespera-explainer-poster.jpg"
        className="aspect-video w-full object-cover"
        aria-label="vespera in 60 seconds — what it does and how to install it"
      >
        <source src="/videos/vespera-explainer.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-200 backdrop-blur-md transition hover:border-white/40 hover:text-white"
      >
        {muted ? '🔇 Sound' : '🔊 Mute'}
      </button>
    </div>
  );
}
