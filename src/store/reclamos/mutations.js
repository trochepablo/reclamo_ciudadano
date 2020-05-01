export function setReclamos (state, reclamos) {
  debugger
  state.reclamos = reclamos
}
export function updateReclamo (state, reclamo) {
  state.reclamo.id = reclamo.id
  state.reclamo.titulo = reclamo.titulo
  state.reclamo.descripcion = reclamo.descripcion
  state.reclamo.comuna = reclamo.comuna
}
export function setReclamoToShow (state, reclamo) {
  state.reclamo = reclamo
}
export function setImageName (state, payload) {
  state.reclamo.imageurl = payload.imageUrl
  state.reclamo.fullpathimage = payload.fullPath
}
