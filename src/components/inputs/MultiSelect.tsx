import { InputComponent } from "@/types";
import { getObjectKeys, objectFromArray } from "@/utils/object";
import { useState } from "react";
import { MdSelectAll, MdClose } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";

interface MultiSelectProps extends InputComponent<any> {
  label?: string;
  options: string[];
}

export function MultiSelect({
  label,
  options,
  value,
  setValue,
}: MultiSelectProps) {
  type ValueKey = keyof typeof value;
  const selected = getObjectKeys(value, true);
  const notSelected = getObjectKeys(value, false);

  const [toggleOpt, setToggleOpt] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");

  const handleClick = (key: ValueKey, resetText: boolean = false) => {
    let newValue = { ...value };
    newValue[key] = !newValue[key];

    setValue(newValue);
    if (resetText) {
      setInputText("");
    }
  };

  const handleClear = () => {
    const newValue = objectFromArray(options, false);

    setValue(newValue);
  };

  const handleSelectAll = () => {
    const newValue = objectFromArray(options, true);

    setValue(newValue);
  };

  return (
    <div className="grid gap-1 relative z-10">
      <label className="font-bold">{label}</label>
      <div className="grid grid-cols-[1fr_2rem] relative border border-black dark:border-white rounded p-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((value, i) => (
            <div
              key={i}
              className="flex gap-2 items-center bg-gray-100 dark:bg-gray-600 p-1"
            >
              <span>{value}</span>
              <button onClick={() => handleClick(value)}>
                <MdClose />
              </button>
            </div>
          ))}

          {notSelected.length > 0 && (
            <input
              className="grow bg-transparent outline-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setToggleOpt(true)}
              onBlur={() => setToggleOpt(false)}
            />
          )}
        </div>

        <div className="flex flex-col h-full items-center justify-center">
          <button className="text-xl" onClick={handleClear}>
            <CgCloseO />
          </button>
        </div>

        {selected.length === 0 && (
          <button
            className="flex absolute right-10 h-full items-center text-xl"
            onClick={handleSelectAll}
          >
            <MdSelectAll />
          </button>
        )}
      </div>

      {toggleOpt && notSelected.length > 0 && (
        <div
          className="grid absolute top-full max-h-80 w-full overflow-y-auto 
          bg-background-primary dark:bg-background-dark
          border border-black dark:border-white"
        >
          {notSelected.map((opt, i) => {
            if (opt.toLowerCase().includes(inputText.toLowerCase())) {
              return (
                <button
                  key={i}
                  className="flex px-2 py-1 hover:bg-gray-400"
                  onMouseDown={() => handleClick(opt, true)}
                >
                  {opt}
                </button>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
