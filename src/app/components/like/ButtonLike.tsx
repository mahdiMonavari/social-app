"use client";

import { useTransition } from "react";
import { toggleLikeMember } from "../../server/actions/likes";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  targetUserId: string;
  hasLike: boolean;
};

function ButtonLike({ targetUserId, hasLike }: Props) {
  const [isPending, startTransition] = useTransition();
  const toggleHandler = () => {
    startTransition(async () => {
      toggleLikeMember({ targetUserId, isLike: hasLike });
    });
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        toggleHandler();
      }}
      className="relative hover:opacity-70 transition cursor-pointer"
    >
      {!isPending ? (
        <>
          <AiFillHeart
            className={`${hasLike ? "fill-rose-500" : "fill-neutral-500/70"}`}
            size={24}
          />

          <AiOutlineHeart
            className="fill-white absolute -top-0.5 -right-0.5"
            size={28}
          />
        </>
      ) : (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      )}
    </div>
  );
}

export default ButtonLike;
