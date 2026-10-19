import React, { useRef, useState, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (originRect?: DOMRect) => void;
  tiltMaxAngle?: number;
  scale?: number;
  perspective?: number;
  interactive?: boolean;
}

export function TiltCard({
  children,
  className = '',
  onClick,
  tiltMaxAngle = 6,
  scale = 1.02,
  perspective = 1100,
  interactive = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * tiltMaxAngle;
    const rY = ((x - centerX) / centerX) * tiltMaxAngle;

    setRotateX(rX);
    setRotateY(rY);

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    if (!interactive || !onClick) return;
    const rect = cardRef.current?.getBoundingClientRect();
    onClick(rect);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale}) translateY(-3px)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative cursor-pointer transition-shadow duration-300 active:scale-[0.985] ${
        isHovered
          ? 'shadow-[0_28px_55px_-12px_rgba(10,58,112,0.18),0_12px_24px_-8px_rgba(46,139,30,0.14)]'
          : ''
      } ${className}`}
    >
      {/* 3D content container */}
      <div 
        style={{ 
          transform: isHovered ? 'translateZ(6px)' : 'translateZ(0px)', 
          transition: 'transform 0.2s ease-out' 
        }}
      >
        {children}
      </div>

      {/* Dynamic Specular Sheen / Light Cone Glare Highlight (Apple-style frosted specular light) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 300px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity * 1.8}), rgba(255, 255, 255, ${glarePosition.opacity * 0.45}) 40%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Iridescent Edge Border Shine (Specular reflection along perimeter) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 340px at ${glarePosition.x}% ${glarePosition.y}%, rgba(46, 139, 30, 0.42), rgba(10, 58, 112, 0.3) 35%, rgba(255, 255, 255, 0.55) 60%, transparent 75%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.2px',
        }}
      />
    </div>
  );
}

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
  originRect?: DOMRect | null;
}

export function IOSModal({
  isOpen,
  onClose,
  children,
  maxWidthClass = 'max-w-2xl',
  originRect,
}: IOSModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Smooth mount and unmount animation state
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = requestAnimationFrame(() => {
        setIsActive(true);
      });
      document.body.style.overflow = 'hidden';
      return () => cancelAnimationFrame(timer);
    } else {
      setIsActive(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 320);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  // Compute exact delta vector and scale between modal center and originating card
  const getOriginTransform = () => {
    if (!originRect || typeof window === 'undefined') {
      return {
        x: 0,
        y: 40,
        scale: 0.85,
      };
    }

    const modalCenterX = window.innerWidth / 2;
    const modalCenterY = window.innerHeight / 2;

    const cardCenterX = originRect.left + originRect.width / 2;
    const cardCenterY = originRect.top + originRect.height / 2;

    const deltaX = cardCenterX - modalCenterX;
    const deltaY = cardCenterY - modalCenterY;

    const estimatedModalWidth = Math.min(window.innerWidth - 32, 600);
    const targetScale = Math.max(0.2, Math.min(originRect.width / estimatedModalWidth, 0.7));

    return {
      x: Math.round(deltaX),
      y: Math.round(deltaY),
      scale: parseFloat(targetScale.toFixed(2)),
    };
  };

  const origin = getOriginTransform();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
      {/* iOS-style frosted blur backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#0F172A]/50 backdrop-blur-2xl transition-opacity duration-300 ease-out cursor-pointer ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* iOS App Expand Card with reverse-to-origin spring physics & Apple-style frosted glass */}
      <div
        style={{
          transform: isActive 
            ? 'translate3d(0, 0, 0) scale(1)' 
            : `translate3d(${origin.x}px, ${origin.y}px, 0) scale(${origin.scale})`,
          opacity: isActive ? 1 : 0,
          filter: isActive ? 'blur(0px)' : 'blur(4px)',
          transition: isActive 
            ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, filter 0.3s ease-out' 
            : 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease-in, filter 0.25s ease-in',
        }}
        className={`relative w-full ${maxWidthClass} max-h-[90vh] glass-panel-elevated text-[#0F172A] rounded-[32px] overflow-hidden flex flex-col z-10 border border-white/80 shadow-[0_32px_90px_-20px_rgba(10,58,112,0.32),0_10px_30px_rgba(0,0,0,0.1),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(15,23,42,0.05)]`}
      >
        {/* iOS Modal Grab Indicator Bar (tap to reverse close) */}
        <div 
          className="w-full flex justify-center pt-3 pb-1 shrink-0 cursor-pointer select-none"
          onClick={onClose}
          title="Close modal"
        >
          <div className="w-12 h-1.5 rounded-full bg-slate-400/40 hover:bg-slate-500/60 transition shadow-2xs" />
        </div>

        {/* Modal scrollable content */}
        <div className="overflow-y-auto px-6 pb-6 pt-1 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
