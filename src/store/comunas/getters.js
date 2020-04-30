export function comunas (state) {
  return state.comunas.map(comuna => {
    return { value: comuna.value, label: comuna.value + ' - ' + comuna.label }
  })
}
