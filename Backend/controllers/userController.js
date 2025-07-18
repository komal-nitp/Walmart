import User from "../models/userModel.js"; // MongoDB User model



export const shareBonus = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bonusPoints = (user.bonusPoints || 0) + 10
    await user.save();

    return res.status(200).json({ message: "10 bonus points added!" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const getUserDetails = async (req, res) => {
    const mongoId = req.user._id;

    try {
        const user= await User.findById(mongoId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Fetched user:", user);
        res.status(200).json(user);

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Coming from auth middleware
    const { fullName, email, phone, gender, interests } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        phone,
        gender,
        interests, // should be an array
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile", err);
    res.status(500).json({ message: "Server error" });
  }
};