export const getTheme = state => {
  const theme = JSON.parse(JSON.stringify(state.theme));

  return {...theme.common, ...theme.themes[theme.current]};
}
