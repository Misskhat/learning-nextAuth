"use server";
import { dbConnect } from "../../lib/dbConnect";
const bcrypt = require("bcrypt");

export async function postUser(CUser) {
  //check user exist
  const isExist = await dbConnect("user").findOne({ email: CUser.email });

  if (isExist) {
    return {
      success: false,
      message: "User already exist.",
    };
  }

  const passwordHash = await bcrypt.hash(CUser.password, 10);
  //create new user
  const newUser = await dbConnect("user").insertOne({
    ...CUser,
    createdAt: new Date(),
    role: "user",
    password: passwordHash,
  });

  // console.log(newUser);

  if (newUser.acknowledged) {
    return {
      success: true,
      message: `user create successfully, userId: ${newUser.insertedId}`,
    };
  }
}
