// This could be synced up with Figma directly by using the Figma API (see https://medium.com/@nicolas.declercq/figma-tokens-automatically-turned-into-code-how-we-kickstarted-our-design-system-f25866c9d842)
// For now, we'll manually enter in all the details, informed by the actual Figma heirarchy and names of tokens

// utility to prefer rems which scale with browser zoom better
const pixelsToRems = (pixels: number) => {
  // assume 16px base; check this against HTML font-size styles
  const rems = pixels / 16;
  return `${rems.toFixed(3)}rem`;
};

const colors = {
  backgrounds: {
    global: '#f2f2f2',
    nestedContainer: '#f5f5f5',
    container: '#ffffff',
    input: '#ffffff'
  },
  typography: {
    base: '#231F20',
    black: '#231F20',
    secondary: '#999999',
    tertiary: '#cccccc'
  },
  iconography: {
    iconography: '#999999' // probably could be named better but hey, it was in Figma
  },
  dynamicAccents: {
    green: {
      foreground: '#30672F',
      background: '#B7F4B5'
    }
  },
  buttons: {
    primary: {
      default: '#FFCD00',
      hover: '#F3C400',
      pressed: '#E1B500'
    },
    secondary: {
      default: '#ffffff',
      hover: '#F4F4F4',
      pressed: '#ECECEC'
    },
    disabled: '#e4e4e4'
    // skipping the destructive variant as it's not needed here
  },
  borders: {
    transparent: '#0000001A',
    formOutlineDefault: '#E4E4E4',
    formOutlineHover: '#cccccc',
    formOutlineActive: '#548BDE',
    formOutlineCritical: '#DC2D2D'
  }
};

const typography = {
  body: {
    regular: {
      fontWeight: 400,
      fontSize: pixelsToRems(14),
      lineHeight: 1.35
    },
    medium: {
      fontWeight: 500,
      fontSize: pixelsToRems(14),
      lineHeight: 1.35 // 18.9px / 14px
    },
    strong: {
      fontWeight: 600,
      fontSize: pixelsToRems(14),
      lineHeight: 1.35 // 18.9px / 14px
    }
  },
  caption: {
    fontWeight: 400,
    fontSize: pixelsToRems(12),
    lineHeight: 1.35
  },
  headings: {
    containerTitle: {
      fontWeight: 600,
      fontSize: pixelsToRems(20)
    }
  },
  elementSpecific: {
    badge: {
      fontWeight: 500,
      fontSize: pixelsToRems(10),
      lineHeight: 1
    }
  }
};

export const FigmaTheme = {
  colors,
  typography
};