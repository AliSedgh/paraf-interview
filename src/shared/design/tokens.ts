export const colors = {
  neutral: {
    900: '#15181a',
    700: '#667880',
    600: '#859399',
    500: '#a3aeb3',
    400: '#c2c9cc',
    300: '#e0e4e6',
    200: '#ecf0f2',
    100: '#f5f7f7',
    0: '#ffffff',
  },
  brand: {
    default: '#7c49f2',
    tint: '#e5dbfc',
    a8: '#7c49f214',
    a30: '#7c49f24d',
    a50: '#7c49f280',
  },
  info: {
    default: '#19a7e5',
    strong: '#1486b7',
    dark: '#0f6489',
    accent: '#177ee5',
    tint: '#d1edfa',
    a8: '#19a7e514',
    a50: '#19a7e580',
  },
  success: {
    default: '#39bf8d',
    alt: '#3dcc96',
    dark: '#257a5a',
    tint: '#d8f5ea',
    a8: '#3dcc9614',
    a30: '#3dcc964d',
    a50: '#3dcc9680',
  },
  warning: {
    default: '#d9a300',
    dark: '#826200',
    tint: '#f7edcc',
    a8: '#d9a30014',
    a30: '#d9a3004d',
    a50: '#d9a30080',
  },
  danger: {
    default: '#e02d2d',
    dark: '#861b1b',
    tint: '#f9d5d5',
    a8: '#e02d2d14',
    a50: '#e02d2d80',
  },
  overlay: {
    dark10: '#15181a1a',
    dark25: '#15181a40',
    neutral8: '#66788014',
    neutral40: '#66788066',
    light20: '#ffffff33',
    light50: '#ffffff80',
  },
} as const

export const spacing = {
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  30: 120,
} as const

export const radius = {
  xs: 4,
  sm: 5,
  md: 8,
  lg: 12,
  xl: 24,
  full: 999,
} as const

export const borderWidth = {
  1: 1,
  1.5: 1.5,
  2: 2,
} as const

export const shadows = {
  l1: '0 0 12px 0 #66788066',
  card: '0 2px 10px 0 #00000026',
  brandGlow: '-8px 0 20px 0 #7c49f280',
} as const

export const fontFamily = "'B Yekan+', Tahoma, system-ui, sans-serif"

type TypeStyle = {
  fontSize: number
  lineHeight: number
  letterSpacing: number
  fontWeight: 400 | 600 | 700
}

export const typography = {
  heading: {
    xlBold: { fontSize: 24, lineHeight: 37.2, letterSpacing: -0.18, fontWeight: 700 },
    xlSemibold: { fontSize: 24, lineHeight: 37.2, letterSpacing: -0.18, fontWeight: 600 },
    lBold: { fontSize: 18, lineHeight: 32, letterSpacing: -0.135, fontWeight: 700 },
    lSemibold: { fontSize: 18, lineHeight: 32, letterSpacing: -0.135, fontWeight: 600 },
    mBold: { fontSize: 16, lineHeight: 30, letterSpacing: -0.12, fontWeight: 700 },
    mSemibold: { fontSize: 16, lineHeight: 30, letterSpacing: -0.12, fontWeight: 600 },
    sBold: { fontSize: 14, lineHeight: 25, letterSpacing: -0.105, fontWeight: 700 },
    sSemibold: { fontSize: 14, lineHeight: 25, letterSpacing: -0.105, fontWeight: 600 },
    xsBold: { fontSize: 12, lineHeight: 18.6, letterSpacing: -0.09, fontWeight: 700 },
    xsSemibold: { fontSize: 12, lineHeight: 16, letterSpacing: -0.09, fontWeight: 600 },
    xxsBold: { fontSize: 10, lineHeight: 15.5, letterSpacing: -0.075, fontWeight: 700 },
    xxsSemibold: {
      fontSize: 10,
      lineHeight: 15.5,
      letterSpacing: -0.075,
      fontWeight: 600,
    },
  },
  text: {
    xxlSemibold: { fontSize: 20, lineHeight: 31, letterSpacing: -0.15, fontWeight: 600 },
    xlRegular: { fontSize: 18, lineHeight: 32, letterSpacing: -0.135, fontWeight: 400 },
    lRegular: { fontSize: 16, lineHeight: 28, letterSpacing: -0.12, fontWeight: 400 },
    lSemibold: { fontSize: 16, lineHeight: 30, letterSpacing: -0.12, fontWeight: 600 },
    mRegular: { fontSize: 14, lineHeight: 25, letterSpacing: -0.105, fontWeight: 400 },
    mSemibold: { fontSize: 14, lineHeight: 25, letterSpacing: -0.105, fontWeight: 600 },
    sRegular: { fontSize: 13, lineHeight: 23, letterSpacing: -0.0975, fontWeight: 400 },
    sSemibold: {
      fontSize: 13,
      lineHeight: 20.15,
      letterSpacing: -0.0975,
      fontWeight: 600,
    },
    xsRegular: { fontSize: 12, lineHeight: 18.6, letterSpacing: -0.09, fontWeight: 400 },
    xxsRegular: {
      fontSize: 10,
      lineHeight: 15.5,
      letterSpacing: -0.075,
      fontWeight: 400,
    },
    xxsSemibold: {
      fontSize: 10,
      lineHeight: 15.5,
      letterSpacing: -0.075,
      fontWeight: 600,
    },
  },
} as const satisfies Record<string, Record<string, TypeStyle>>

export const gradients = {
  surface: 'linear-gradient(to bottom, #ffffff 0%, #ecf0f2 100%)',
  brand: 'linear-gradient(to bottom, #7c49f2 0%, #e5dbfc 100%)',
  brandTint: 'linear-gradient(to bottom, #e5dbfc 0%, #ffffff 100%)',
  infoTint: 'linear-gradient(to bottom, #d1edfa 0%, #ffffff 100%)',
  successTint: 'linear-gradient(to bottom, #d8f5ea 0%, #ffffff 100%)',
  warningTint: 'linear-gradient(to bottom, #f7edcc 0%, #ffffff 100%)',
  dangerTint: 'linear-gradient(to bottom, #f9d5d5 0%, #ffffff 100%)',
  infoBrand: 'linear-gradient(to bottom, #d1edfa 0%, #e5dbfc 100%)',
} as const

export const tokens = {
  colors,
  spacing,
  radius,
  borderWidth,
  shadows,
  fontFamily,
  typography,
  gradients,
} as const
