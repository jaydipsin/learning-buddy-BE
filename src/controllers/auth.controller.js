export const handleRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    

  } catch (err) {}
};

export const handleLogin = async () => {};

export const handleLogout = async () => {};

export const handleForgotPassword = async () => {};
