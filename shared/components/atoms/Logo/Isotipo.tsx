import React, { FC, SVGProps } from 'react'

export const Isotipo: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_251_327)">
        <path
          d="M40.0022 20.0791V39.9597C17.9203 39.9666 -0.00709905 22.1439 0.00217416 0.196129H20.0022C19.9929 11.1677 28.9717 20.086 40.0022 20.0767V20.0791Z"
          fill="url(#paint0_linear_251_327)"
        />
        <path
          d="M20 40.0402C20 51.021 28.9556 59.9208 40 59.9208C51.0444 59.9208 60 51.0187 60 40.0402H80C80 61.9995 62.0911 79.8037 39.9977 79.8037C17.9042 79.8037 -7.62939e-06 62.0018 -7.62939e-06 40.0402V0.198303C-7.62939e-06 14.9169 8.0445 27.7666 20 34.6408V40.0402Z"
          fill="url(#paint1_linear_251_327)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_251_327"
          x1="10.001"
          y1="30.0205"
          x2="38.115"
          y2="1.73542"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E75528" />
          <stop offset="0.15" stopColor="#E95D28" />
          <stop offset="0.38" stopColor="#EE732A" />
          <stop offset="0.64" stopColor="#F7942D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_251_327"
          x1="33.4438"
          y1="34.0832"
          x2="-6.23939"
          y2="-35.063"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E75528" />
          <stop offset="0.1" stopColor="#D43D2A" />
          <stop offset="0.21" stopColor="#BE202E" />
          <stop offset="0.43" stopColor="#96202E" />
        </linearGradient>
        <clipPath id="clip0_251_327">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
