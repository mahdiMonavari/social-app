import { SelectItemType } from "./Filters";
import { motion } from "framer-motion";
import useSearchQuery from "@/src/lib/hooks/useSearchQuery";

type Props = {
  options: SelectItemType[];
  layoutId: string;
  scope: string;
  handleUrl?: boolean;
  value?: string;
  onChange?: (val: string) => void;
};

function Selection({
  layoutId,
  options,
  scope,
  handleUrl = true,
  value,
  onChange,
}: Props) {
  const { getQuery, setQuery } = useSearchQuery();
  const currentValue = !handleUrl
    ? (value ?? options[0].label)
    : getQuery(layoutId) || options[0].label;

  const handleSelect = (newValue: string) => {
    if (!handleUrl) {
      onChange?.(newValue);
      console.log(newValue);
    } else {
      setQuery(layoutId, newValue);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 p-1 w-full md:w-fit bg-sky-700/80 rounded-2xl border border-white/10 backdrop-blur-md">
      {options.map((option) => {
        const isActive = currentValue === option.label;
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => handleSelect(option.label)} // اینجا دیگه مهم نیست کجا تغییر میکنه
            className="relative px-6 py-2 text-sm font-medium transition-colors duration-200 z-10 flex items-center justify-center gap-2"
          >
            {isActive && (
              <motion.div
                layoutId={`active-glass-${scope}-${layoutId}`}
                className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span
              className={`${isActive ? "text-white" : "text-white/60"} text-xs`}
            >
              {option.showToUser}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default Selection;
