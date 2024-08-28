import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { sendEmail } from "@/helpers/mailer";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

// connect to db
connect();

// take the userId from bearer token , then get the email and send the mail to user for password reset

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not exist" }, { status: 400 });
    }

    const userEmail = user.email;

    // send the email to user
    await sendEmail({ email: userEmail, emailType: "RESET", userId: user._id });

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
