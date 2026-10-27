import React from "react";
import { getMessageFilterByContainer } from "../server/actions/message";
import MessagesTabel from "./MessagesTabel";

async function MssagesPage(props: PageProps<"/messages">) {
  const { container = "inbox" } = await props.searchParams;
  const messages = await getMessageFilterByContainer(container as string);

  return (
    <div>
      <MessagesTabel
        container={((container as "inbox") || "outbox") ?? "inbox"}
        messages={messages}
      />
    </div>
  );
}

export default MssagesPage;
