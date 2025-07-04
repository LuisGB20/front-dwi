import { ref } from 'vue'

export const usuarioAutenticado = ref(false)
export const usuario = ref(null)

export async function verificarSesion() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verificar-sesion`, {
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      usuarioAutenticado.value = data.autenticado
      console.log(usuarioAutenticado.value)
      usuario.value = data.usuario
    } else {
      usuarioAutenticado.value = false
      usuario.value = null
    }
  } catch (err) {
    usuarioAutenticado.value = false
    usuario.value = null
  }
}

export const logout = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  console.log(response)
  usuarioAutenticado.value = false
}