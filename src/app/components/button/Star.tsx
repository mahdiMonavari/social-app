import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  loading: boolean;
  isSelected: boolean;
};

function Star({ isSelected, loading }: Props) {
  return (
    <div className="relative hover:scale-90 transition-all duration-300">
      {loading ? (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      ) : (
        <>
          <AiOutlineStar
            size={32}
            className="absolute -top-0.5 -right-0.5 fill-amber-300"
          />
          <AiFillStar
            size={28}
            className={`${isSelected ? "fill-amber-300" : "fill-neutral-600/60"}`}
          />
        </>
      )}
    </div>
  );
}

export default Star;
