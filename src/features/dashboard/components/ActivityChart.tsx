'use client'

import { curveCatmullRom } from 'd3-shape'
import { Zap } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts'

import { chartData } from '../mocks'

const W = 554
const H = 270
const PLOT_LEFT = 80.25
const PLOT_RIGHT = 519.96
const PLOT_TOP = 25.79
const PLOT_BOTTOM = 228.23
const POINT_PADDING = 37

const GRID_MINOR = [46.36, 86.68, 127.01, 167.33, 207.66]
const GRID_MAJOR = [25.79, 66.11, 147.58, 187.9]
const EMPHASIS_VALUE = 60

const Y_TICKS = [
  { label: '۱۰۰', top: 17.5, left: 42 },
  { label: '۸۰', top: 58.5, left: 43 },
  { label: '۶۰', top: 98.5, left: 43.5 },
  { label: '۴۰', top: 139.5, left: 43 },
  { label: '۲۰', top: 179.5, left: 45 },
]
const Y_ZERO = { label: '۰', top: 222.47, right: W - 204.72 + 168 - 31.73 }

const X_TICKS = [117.7, 189.93, 263.06, 336.19, 409.8, 482.78]
const X_TICK_TOP = 234.03

const GRADIENT_TOP = 66.16
const GRADIENT_BOTTOM = 188.05

export function ActivityChart() {
  return (
    <div className="relative h-[270px] w-[554px] overflow-hidden" dir="ltr">
      <LineChart
        width={W}
        height={H}
        data={chartData}
        margin={{
          top: PLOT_TOP,
          right: W - PLOT_RIGHT,
          bottom: H - PLOT_BOTTOM,
          left: PLOT_LEFT,
        }}
      >
        <defs>
          <linearGradient
            id="paraf-activity-line"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={GRADIENT_TOP}
            x2="0"
            y2={GRADIENT_BOTTOM}
          >
            <stop offset="0%" stopColor="#3dc793" />
            <stop offset="50%" stopColor="#8e8e8e" />
            <stop offset="100%" stopColor="#e02d2d" />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          horizontalPoints={GRID_MINOR}
          stroke="#ebebeb"
          strokeWidth={0.82}
        />
        <CartesianGrid
          vertical={false}
          horizontalPoints={GRID_MAJOR}
          stroke="#cccccc"
          strokeWidth={0.82}
        />
        <ReferenceLine y={EMPHASIS_VALUE} stroke="#434343" strokeWidth={0.82} />
        <ReferenceLine y={0} stroke="#333333" strokeWidth={0.82} />

        <XAxis
          dataKey="month"
          hide
          padding={{ left: POINT_PADDING, right: POINT_PADDING }}
        />
        <YAxis hide domain={[0, 100]} />

        <Line
          type={curveCatmullRom}
          dataKey="value"
          stroke="url(#paraf-activity-line)"
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>

      {Y_TICKS.map((tick) => (
        <span
          key={tick.label}
          style={{ top: tick.top, left: tick.left }}
          className="absolute flex h-4 items-center gap-fa-0_5"
        >
          <Zap className="size-3 shrink-0 text-neutral-400" strokeWidth={1} aria-hidden />
          <span className="text-b-2xs text-[#444444]">{tick.label}</span>
        </span>
      ))}
      <span
        style={{ top: Y_ZERO.top, left: 36.72, width: 31.73 }}
        className="absolute text-right text-b-2xs text-[#444444]"
      >
        {Y_ZERO.label}
      </span>

      {X_TICKS.map((left, i) => (
        <span
          key={chartData[i].month}
          style={{ top: X_TICK_TOP, left }}
          className="absolute -translate-x-1/2 text-b-2xs whitespace-nowrap text-[#222222]"
        >
          {chartData[i].month}
        </span>
      ))}
    </div>
  )
}
