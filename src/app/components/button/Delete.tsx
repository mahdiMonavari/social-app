import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  loading: boolean;
};

function Delete({ loading }: Props) {
  return (
    <div className="relative">
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
