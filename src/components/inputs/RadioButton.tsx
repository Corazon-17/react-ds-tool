import { InputComponent } from "@/types";

interface RadioButtonProps extends InputComponent<string> {
  options: string[];
  label?: string;
  direction?: "vertical" | "horizontal";
}

export function RadioButton({
  label,
  options,
  value,
  setValue,
  direction = "horizontal",
}: RadioButtonProps) {
  return (
    <div className="grid gap-1">
      {label && <label className="font-bold">{label}</label>}
      <div
        className={`flex flex-wrap gap-x-3 gap-y-2 ${
          direction === "vertical" && "flex-col"
        }`}
      >
        {options.map((option, i) => (
          <div
            key={i}
            className="flex gap-2 w-max"
            onClick={(e) => setValue(option)}
          >
            <input
              type="radio"
              value={option}
              checked={value == option}
              onChange={(e) => setValue(e.target.value)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
