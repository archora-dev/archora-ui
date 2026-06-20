// Тени соответствуют --elev-* в theme.css (тёмная тема).
// --arch-shadow-sm/md/lg/xl ссылаются на var(--elev-1/2/3).
// --arch-shadow-focus ссылается на var(--ring-focus).
// Значения здесь — TS-эквиваленты для dark-темы по умолчанию.
export const shadows = {
  sm: "0 0 0 1px rgb(255 255 255 / 0.04) inset, 0 1px 0 rgb(255 255 255 / 0.05) inset, 0 1px 2px rgb(0 0 0 / 0.4)",
  md: "0 0 0 1px rgb(255 255 255 / 0.05) inset, 0 1px 0 rgb(255 255 255 / 0.06) inset, 0 1px 2px rgb(0 0 0 / 0.5), 0 8px 24px -8px rgb(0 0 0 / 0.6)",
  lg: "0 0 0 1px rgb(255 255 255 / 0.06) inset, 0 1px 0 rgb(255 255 255 / 0.08) inset, 0 4px 8px rgb(0 0 0 / 0.5), 0 20px 40px -12px rgb(0 0 0 / 0.7)",
  focus: "0 0 0 2px #0a0c10, 0 0 0 4px #7c6dff"
} as const;
