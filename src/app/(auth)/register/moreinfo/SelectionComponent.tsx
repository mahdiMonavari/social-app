import Selection from "@/src/app/members/Selection";
import { SelectItemType } from "@/src/app/members/Filters";
import { FaFemale, FaMale } from "react-icons/fa";

import { useFormContext, useWatch } from "react-hook-form";
import { Profile } from "@/src/lib/schemas/register";
const selections: SelectItemType[] = [
  {
    label: "male",
    showToUser: <FaMale size={16} />,
  },
  {
    label: "female",
    showToUser: <FaFemale size={16} />,
  },
];

function SelectionComponent() {
  const { control, setValue } = useFormContext<Profile>();
  const gender = useWatch({ control, name: "gender" });
  return (
    <div>
      <label className="mb-2 text-sm font-semibold">Gender</label>
      <div className="w-full flex items-center justify-center">
        <Selection
          layoutId="gender"
          options={selections}
          scope="more-info"
          handleUrl={false}
          value={gender}
          onChange={(value) => {
            setValue("gender", value as "male" | "female");
          }}
        />
      </div>
    </div>
  );
}

export default SelectionComponent;
