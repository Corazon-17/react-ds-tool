import { BaseComponent, InputComponent } from "@/types";

interface SelectBoxProps extends BaseComponent, InputComponent<string> {
  label?: string;
  options: string[];
}

export function SelectBox({
  label,
  options,
  value,
  setValue,
  className,
}: SelectBoxProps) {
  return (
    <div className={`grid gap-1 ${className}`}>
      {label && <label className="font-bold">{label}</label>}
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-1 rounded text-black border border-blue-primary outline-none"
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
