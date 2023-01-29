import { InputComponent } from "@/types";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";

interface NumberInputProps extends InputComponent<number> {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  withButton?: boolean;
}

export function NumberInput({
  label,
  value,
  setValue,
  min,
  max,
  step,
  withButton,
}: NumberInputProps) {
  const validate = (newNumber: number) => {
    if (newNumber < min!) {
      setValue(min as number);
    } else if (newNumber > max!) {
      setValue(max as number);
    } else {
      setValue(newNumber);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.trim() === "") {
      setValue((min as number) || 0);
    } else if (!Number.isNaN(Number(newValue))) {
      const newNumber = Number(newValue);
      validate(newNumber);
    }
  };

  const handleButton = (type: "add" | "subtract") => {
    if (type === "add") {
      const newValue = step ? step + value : value + 1;
      validate(Number(newValue.toFixed(3)));
    } else {
      const newValue = step ?  value - step : value - 1;
      validate(Number(newValue.toFixed(3)));
    }
  };

  return (
    <div className="grid gap-1">
      <label className="font-bold">{label}</label>
      <div className="flex relative text-black ">
        <input
          type="number"
          value={value.toString()}
          onChange={(e) => handleChange(e)}
          step={step}
          className="w-full p-1 border border-blue-primary rounded outline-none"
        />
        {withButton && (
          <>
            <button
              className="flex absolute w-6 h-full items-center right-6"
              onClick={() => handleButton("subtract")}
            >
              <HiMinusSm />
            </button>
            <button
              className="flex absolute w-6 h-full items-center right-0"
              onClick={() => handleButton("add")}
            >
              <HiPlusSm />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
