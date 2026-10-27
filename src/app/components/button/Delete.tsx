import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  loading: boolean;
  disable: boolean;
};

function Delete({ loading, disable }: Props) {
  if (disable) return null;
  return (
    <div className="relative hover:scale-90 transition-all duration-300">
      {loading ? (
        <PiSpinnerGap size={32} className="fill-white animate-spin" />
      ) : (
        <>
          <AiOutlineDelete
            size={32}
            className="absolute -top-0.5 -right-0.5 fill-white"
          />

          <AiFillDelete size={28} className="fill-red-600" />
        </>
      )}
    </div>
  );
}

export default Delete;
