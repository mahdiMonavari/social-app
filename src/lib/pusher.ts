import PusherServer from "pusher";
declare global {
  var pusherSeverInctance: PusherServer | undefined;
}
if (!global.pusherSeverInctance) {
  global.pusherSeverInctance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap2",
    useTLS: true,
  });
}

export const pusherServer = global.pusherSeverInctance;
