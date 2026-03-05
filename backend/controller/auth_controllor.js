import prisma from "../prismaclient.js";
import argon2 from "argon2";

async function signup(req, res) {
  try {
    const {
      organization_id,
      full_name,
      email,
      password,
      employee_id,
      sales_region,
      preferred_language,
    } = req.body;
   console.log(organization_id)
    
    const organization = await prisma.organization.findUnique({
      where: { organization_id },
    });
    

    if (!organization) {
      return res.status(404).json({
        msg: "Organization does not exist",
      });
    }

    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists redirecting to login",
      });
    }

    const hashedPassword = await argon2.hash(password);

    
    const newUser = await prisma.user.create({
      data: {
        organization_id,
        full_name,
        email,
        password: hashedPassword, 
        employee_id,
        sales_region,
        preferred_language,
      },
      
    });

    return res.status(201).json({
      msg: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export default signup;