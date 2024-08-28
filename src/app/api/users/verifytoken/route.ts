import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";

import { NextRequest, NextResponse } from "next/server";

// connect to the DB
connect();

// when user click on forgot password we send an email to user with a token and same token stored in database
// when user visit that or click the link from email, if the token matches then we will show them the
// new password field and update the password of the user in database and redirect them to login page

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token: ", token);

    // find the user from DB
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Token Verified",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
