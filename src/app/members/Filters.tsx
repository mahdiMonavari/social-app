"use client";
import React, { ReactElement } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { Label, Slider } from "@heroui/react";
import Selection from "./Selection";
import useSearchQuery from "@/src/lib/hooks/useSearchQuery";

export type SelectItemType = {
  showToUser: string | ReactElement;
  label: string;
};

export const genders: SelectItemType[] = [
  {
    label: "",
    showToUser: (
      <div className="flex items-center gap-1">
        <FaFemale size={16} />
        <FaMale size={16} />
      </div>
    ),
  },
  {
    label: "male",
    showToUser: <FaMale size={16} />,
  },
  {
    label: "female",
    showToUser: <FaFemale size={16} />,
  },
];

export const orderByList: SelectItemType[] = [
  {
    showToUser: "Last Active",
    label: "updated",
  },
  {
    showToUser: "News Member",
    label: "created",
  },
];

function Filters({ scope, count }: { scope: string; count?: number }) {
  const { setQuery, getQuery } = useSearchQuery();
  const firstValueFromAge = getQuery("fromAge") || 18;
  const firstValueToAge = getQuery("toAge") || 45;
  return (
    <div className="px-5 py-2 my-5 shadow-xs md:shadow-2xl bg-white rounded-md flex flex-col md:flex-row items-center gap-5 md:gap-2 justify-between">
      <div>Resulte : {count}</div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Selection scope={scope} layoutId="gender" options={genders} />
        <Selection scope={scope} layoutId="orderBy" options={orderByList} />
      </div>
      <div>
        <Slider
          className="w-full max-w-xs min-w-3xs"
          defaultValue={[Number(firstValueFromAge), Number(firstValueToAge)]}
          formatOptions={{ currency: "AGE", style: "decimal" }}
          maxValue={80}
          minValue={7}
          step={1}
          onChangeEnd={(value) => {
            if (typeof value !== "number") {
              const [fromAge, toAge] = value;
              setQuery({
                fromAge,
                toAge,
              });
            }
          }}
        >
          <Label>Age Range</Label>
          <Slider.Output />
          <Slider.Track>
            {({ state }) => (
              <>
                <Slider.Fill />
                {state.values.map((_, i) => (
                  <Slider.Thumb key={i} index={i} />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>
      </div>
    </div>
  );
}

export default Filters;
