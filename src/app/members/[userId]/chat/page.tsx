import { getMessages } from "@/src/app/server/actions/message";
import { requiredUser } from "@/src/lib/auth";
import MessageList from "./MessageList";
import { createChatId } from "@/src/lib/utils";

async function page(props: PageProps<"/members/[userId]/chat">) {
  const { userId } = await props.params;
  const { messages, readCount } = await getMessages(userId);
  const currentUser = await requiredUser();
  const chatId = createChatId(userId, currentUser.id);
  return (
    <div className="flex-1 flex flex-col justify-between">
      <MessageList
        chatId={chatId}
        currentUser={currentUser}
        initialMessage={messages}
        readCount={readCount}
      />
    </div>
  );
}

export default page;
