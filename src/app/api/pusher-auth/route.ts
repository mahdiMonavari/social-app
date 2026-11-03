import { getCurrentUser } from "@/src/lib/auth";
import { pusherServer } from "@/src/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id || !user.email) {
      return new Response("unauthorized", { status: 401 });
    }
    const body = await request.formData();
    const socketId = body.get("socket_id") as string;
    const chaanel = body.get("channel_name") as string;
    if (chaanel.startsWith("presence-")) {
      const data = {
        user_id: user.id,
        user_info: {
          name: user.name,
          email: user.email,
        },
      };
      const authResponse = pusherServer.authorizeChannel(
        socketId,
        chaanel,
        data,
      );
      return NextResponse.json(authResponse);
    }
    const authResponse = pusherServer.authorizeChannel(socketId, chaanel);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.log(error);
    return new Response("someting wet wrong...", { status: 500 });
  }
}
