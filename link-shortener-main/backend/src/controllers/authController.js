import { authRegisterUser, authLoginUser} from "../services/authService.js"

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Registrar usuario
    const response = await authRegisterUser(email, password)
    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Iniciar sesion
const loginUser = async (req, res) => {
	const { email, password} = req.body

	try {
		const response = await authLoginUser(email, password)
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}


export { registerUser, loginUser }