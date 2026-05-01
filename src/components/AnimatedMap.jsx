import React, { useState, useEffect, useRef, useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import topology from '../assets/world-110m.json';
import { Ic, C } from './ui';

// Actual coordinates: [Longitude, Latitude]
const MAP_LOCATIONS = [
  { id: 'canada', name: 'Ontario, Canada', subtitle: 'North America Hub', coords: [-79.3832, 43.6532] }, // Toronto
  { id: 'india', name: 'Hyderabad, India', subtitle: 'APAC Delivery Center', coords: [78.4867, 17.3850] },
];

export default function AnimatedMap({ locations = MAP_LOCATIONS }) {
  const width = 800;
  const height = 500;

  const projection = useMemo(() => {
    return geoMercator()
      .scale(125)
      .translate([width / 2, height / 1.6]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const countries = useMemo(() => {
    return feature(topology, topology.objects.countries).features;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    // 1. Initial landing animation
    const landTimer = setTimeout(() => {
      setHasLanded(true);
    }, 300);

    // 2. Start loop
    const startLoop = setTimeout(() => {
      setCurrentIndex(0);
    }, 2000);

    return () => {
      clearTimeout(landTimer);
      clearTimeout(startLoop);
    };
  }, []);

  useEffect(() => {
    if (currentIndex === -1) return;

    const timer = setTimeout(() => {
      if (currentIndex >= locations.length - 1) {
        setCurrentIndex(-1);
        setTimeout(() => setCurrentIndex(0), 2500);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [currentIndex, locations.length]);

  // Determine scaling and translation to apply to the SVG group
  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  if (currentIndex !== -1 && locations[currentIndex]) {
    const loc = locations[currentIndex];
    const [x, y] = projection(loc.coords);
    scale = 2.8;
    // When scaling an SVG <g>, the origin is 0,0. 
    // We want the point (x, y) to end up at (width/2, height/2).
    translateX = (width / 2) - (x * scale);
    translateY = (height / 2) - (y * scale);
  }

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        // No distinct box background, border, or shadow! Mixes natively with the page.
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ 
          width: '100%', height: '100%', 
          opacity: hasLanded ? 1 : 0,
          transform: hasLanded ? 'scale(1)' : 'scale(1.05)',
          transition: 'opacity 1s ease, transform 1s ease',
          // Mask to fade out the edges of the map so it blends perfectly
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
        }}
      >
        <g 
          style={{ 
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            transition: 'transform 2.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: '0 0' 
          }}
        >
          {/* Countries */}
          {countries.map((d, i) => (
            <path
              key={`path-${i}`}
              d={pathGenerator(d)}
              fill="rgba(255, 255, 255, 0.5)" // Frosted white continents
              stroke="rgba(0, 102, 255, 0.15)" // Very soft blue borders
              strokeWidth={1 / scale}
              style={{ transition: 'all 0.3s' }}
            />
          ))}

          {/* Location Markers */}
          {locations.map((loc, index) => {
            const [x, y] = projection(loc.coords);
            const isActive = currentIndex === index;

            return (
              <g key={`marker-${loc.id}`} transform={`translate(${x}, ${y})`}>
                {/* Ping animation */}
                {isActive && (
                  <circle 
                    r={3 / scale} 
                    fill="none" 
                    stroke={C.teal} 
                    strokeWidth={1.5 / scale}
                    style={{ animation: 'mapPulse 2s infinite' }}
                  />
                )}
                {/* Core dot */}
                <circle 
                  r={3 / scale} 
                  fill={isActive ? C.teal : 'rgba(0, 102, 255, 0.4)'} 
                  opacity={isActive ? 1 : 0.6}
                />

                {/* Text Label - Mixing naturally with background */}
                <g 
                  style={{ 
                    opacity: isActive ? 1 : 0, 
                    transition: 'opacity 0.6s ease 1s',
                    pointerEvents: 'none'
                  }}
                >
                  {/* Subtle connecting line */}
                  <line 
                    x1={4 / scale} 
                    y1={-4 / scale} 
                    x2={16 / scale} 
                    y2={-16 / scale} 
                    stroke={C.teal} 
                    strokeWidth={1.5 / scale} 
                    opacity={0.8}
                  />
                  
                  <text 
                    x={20 / scale} 
                    y={-18 / scale} 
                    fill="#0a0a14" // Dark text for readability on light background
                    fontSize={14 / scale} 
                    fontWeight="900" 
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }} // White glow
                  >
                    {loc.name}
                  </text>
                  <text 
                    x={20 / scale} 
                    y={-4 / scale} 
                    fill={C.teal} 
                    fontSize={10 / scale} 
                    fontWeight="700" 
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    style={{ textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}
                  >
                    {loc.subtitle}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Global Status Pill */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: 8, 
          padding: '8px 16px', borderRadius: 50, 
          background: 'rgba(255, 255, 255, 0.6)', // Light frosted glass
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 102, 255, 0.15)',
          boxShadow: '0 8px 24px rgba(0, 53, 128, 0.08)'
        }}>
          <Ic n="Globe" s={14} style={{ color: C.teal }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#0a0a14', letterSpacing: '.05em' }}>
            {currentIndex === -1 ? 'GLOBAL NETWORK' : `ACTIVE HUB: ${locations[currentIndex]?.name.toUpperCase()}`}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes mapPulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
