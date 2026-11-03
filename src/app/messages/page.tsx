import { getMessageFilterByContainer } from "../server/actions/message";
import MessagesTabel from "./MessagesTabel";

async function MssagesPage(props: PageProps<"/messages">) {
  const { container = "inbox" } = await props.searchParams;
  const messages = await getMessageFilterByContainer(container as string);

  return (
    <div>
      <MessagesTabel
        container={((container as "inbox") || "outbox") ?? "inbox"}
        initialMessages={messages}
        key={container as string}
      />
    </div>
  );
}

export default MssagesPage;
