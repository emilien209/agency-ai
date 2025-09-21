import type { SVGProps } from 'react';

export function CodeAILogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g fill="url(#logo-gradient)">
        <path d="M64,32 L96,32 L96,64 L64,64 L64,32 Z M112,32 L144,32 L144,64 L112,64 L112,32 Z M160,32 L192,32 L192,64 L160,64 L160,32 Z M64,80 L96,80 L96,112 L64,112 L64,80 Z M112,80 L144,80 L144,112 L112,112 L112,80 Z M160,80 L192,80 L192,112 L160,112 L160,80 Z M64,128 L96,128 L96,160 L64,160 L64,128 Z M112,128 L144,128 L144,160 L112,160 L112,128 Z M160,128 L192,128 L192,160 L160,160 L160,128 Z" opacity="0.1" />
        <path d="M96.2,60.8c-3.3,3.3 -3.3,8.7 0,12l47.1,47.1c3.3,3.3 8.7,3.3 12,0l47.1,-47.1c3.3,-3.3 3.3,-8.7 0,-12s-8.7,-3.3 -12,0l-41.1,41.1l-41.1,-41.1c-3.3,-3.3 -8.7,-3.3 -12,0z" transform="rotate(45, 150, 90)" />
        <path d="M54.6,128.1l42.4,42.4c3.3,3.3 8.7,3.3 12,0l42.4,-42.4c3.3,-3.3 3.3,-8.7 0,-12s-8.7,-3.3 -12,0l-36.4,36.4l-36.4,-36.4c-3.3,-3.3 -8.7,-3.3 -12,0s-3.3,8.7 0,12z" transform="rotate(-135, 110, 150)" />
      </g>
    </svg>
  );
}
