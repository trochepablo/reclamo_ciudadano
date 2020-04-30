export function setReclamos (state, reclamos) {
  state.reclamos = reclamos
}
export function updateReclamo (state, reclamo) {
  state.reclamo.titulo = reclamo.titulo
  state.reclamo.descripcion = reclamo.descripcion
  state.reclamo.comuna = reclamo.comuna
}
export function setReclamoToShow (state, reclamo) {
  debugger
  state.reclamo = reclamo
}
export function setImageName (state, payload) {
  state.reclamo.imageurl = payload.imageUrl
  state.reclamo.fullpathimage = payload.fullPath
}
