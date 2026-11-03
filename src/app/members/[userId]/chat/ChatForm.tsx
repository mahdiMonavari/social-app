"use client";
import { createMessage } from "@/src/app/server/actions/message";
import { chatSchema, ChatType } from "@/src/lib/schemas/chat";
import { Button, InputGroup, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

function ChatForm({ triggerTyping }: { triggerTyping: () => void }) {
  const params = useParams<{ userId: string }>();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid, isSubmitting },
  } = useForm<ChatType>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      text: "",
    },
  });
  const submiter = async (data: ChatType) => {
    const result = await createMessage(params.userId, data);
    if (!result.success) {
      return toast.danger(result.error as string);
    }
    return resetField("text");
  };
  const { onChange, ...registerProps } = register("text");
  const handleEvent = async (e: ChangeEvent<HTMLInputElement>) => {
    await onChange(e);
    triggerTyping();
  };
  return (
    <form onSubmit={handleSubmit(submiter)} className="w-full py-2">
      <InputGroup className="w-full flex items-center py-2 justify-between gap-1 border-none outline-none">
        <InputGroup.Input
          aria-label="chat input"
          {...registerProps}
          type="text"
          className="flex-1 focus:border-none focus:outline-none"
          onChange={handleEvent}
        />
        <InputGroup.Suffix>
          <Button
            isIconOnly
            isDisabled={!isValid}
            type="submit"
            isPending={isSubmitting}
            className="rounded-full"
          >
            <HiPaperAirplane size={18} />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </form>
  );
}

export default ChatForm;
