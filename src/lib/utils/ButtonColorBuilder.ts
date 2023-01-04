import type { Colors } from "$lib/model/common/colors";

export const getColors = (color: Colors) => {
  switch (color) {
    case 'primary':
      return buildColor('fuchsia');
    case 'secondary':
      return buildColor('teal');
    case 'danger':
      return buildColor('rose');
    case 'success':
      return buildColor('emerald');
    case 'warning':
      return buildColor('amber');
    case 'info':
      return buildColor('sky');
    default:
      return buildColor('fuchsia');
  }
};

const buildColor = (twColor: string) => {
  return {
    bg: `bg-${twColor}-200`,
    text: `text-${twColor}-700`,
    hover: {
      bg: `hover:bg-${twColor}-300`,
    },
    disabled: {
      bg: `disabled:bg-${twColor}-100`,
      text: `disabled:text-${twColor}-300`
    },
    loader: `text-${twColor}-500`
  }
};
