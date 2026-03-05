import prisma from "../prismaclient.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    let user;
    let hashedPassword;
    let userIdField;

    if (role === "Sales Executive") {
      user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ msg: "Invalid email, password or role" });
      }

      hashedPassword = user.password;
      userIdField = user.user_id;

    } else if (role === "admin") {
      user = await prisma.admin.findUnique({
        where: { admin_email: email }
      });

      if (!user) {
        return res.status(401).json({ msg: "Invalid email or password" });
      }

      hashedPassword = user.admin_password;
      userIdField = user.admin_id;

    } else {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const isValid = await argon2.verify(hashedPassword, password);

    if (!isValid) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: userIdField,
        organization_id: user.organization_id,
        role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    const { password: _, admin_password: __, ...safeUser } = user;

    return res.status(200).json({
      msg: "User signed in successfully",
      token,
      user: safeUser
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
}

export default login;