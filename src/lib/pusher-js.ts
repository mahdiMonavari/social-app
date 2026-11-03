import PusherClient from "pusher-js";
import { ChannelAuthorizerProxy } from "pusher-js/types/src/core/auth/deprecated_channel_authorizer";
declare global {
  var pusherClientInstance: PusherClient | undefined;
}

export function getPusherClient(): PusherClient {
  if (!global.pusherClientInstance) {
    global.pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
      {
        channelAuthorization: {
          endpoint: "/api/pusher-auth",
          transport: "ajax",
        },
        cluster: "ap2",
      },
    );
  }
  return global.pusherClientInstance;
}
