"use client";
import { authClient } from "@/src/lib/auth-client";
import { useMessageStore } from "@/src/lib/hooks/useMessageStore";
import useNotification from "@/src/lib/hooks/useNotification";
import usePresece from "@/src/lib/hooks/usePresece";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { getUnreadMessageCount } from "../server/actions/message";

function Providers({ children }: { children: ReactNode }) {
  const session = authClient.useSession();
  const userId = session.data?.user.id || null;
  const updateUnReadMessage = useMessageStore(
    (s) => s.updateUnReadMessageCount,
  );
  const isUnReadMessageSet = useRef(false);
  const getUnReadMessage = useCallback(async () => {
    const count = await getUnreadMessageCount();
    updateUnReadMessage(count);
  }, [updateUnReadMessage]);
  useEffect(() => {
    if (!isUnReadMessageSet.current) {
      getUnReadMessage();
      isUnReadMessageSet.current = true;
    }
  }, [isUnReadMessageSet, getUnReadMessage]);
  usePresece(userId);
  useNotification(userId);
  return <>{children}</>;
}

export default Providers;
