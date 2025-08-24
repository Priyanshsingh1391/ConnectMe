export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth();  // ✅ not await, Clerk sets it directly
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    req.userId = userId; // ✅ store in req for controller
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
