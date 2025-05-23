import User from "../models/User.js";

export const createUser = async (req, res) => {
  console.log('BODY:', req.body); // <- DODAJ TO!
  try {
    const { email } = req.body;
    if (!email) {
      console.log('❌ No email received in body');
      // return res.status(403).json({ message: "No email provided" });
    }
    const user = await User.create({ email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};