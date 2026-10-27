import React from "react";
import ChatForm from "./ChatForm";
import { getMessages } from "@/src/app/server/actions/message";
import MessageBox from "./MessageBox";
import { requiredUser } from "@/src/lib/auth";

async function page(props: PageProps<"/members/[userId]/chat">) {
  const { userId } = await props.params;
  const messages = await getMessages(userId);
  const currentUser = await requiredUser();

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex-1">
        {messages.length === 0 ? (
          <div className="flex h-full justify-center items-center text-sky-700">
            There is no message yet. Start conversation
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBox
              key={message.id}
              currentUser={currentUser.id}
              message={message}
              shouldShowAvatar={
                index === 0 ||
                messages[index].senderId !== messages[index - 1].senderId
              }
            />
          ))
        )}
      </div>
      <ChatForm />
    </div>
  );
}

export default page;
