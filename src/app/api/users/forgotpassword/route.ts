import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { sendEmail } from "@/helpers/mailer";

import { NextRequest, NextResponse } from "next/server";

// connect to db
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email: email }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "Email is not registered" },
        { status: 400 }
      );
    }

    // send the email to user
    await sendEmail({ email: email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      {
        message: "Forgot password success",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
