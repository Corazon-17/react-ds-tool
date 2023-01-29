import { InputComponent } from "@/types";

interface CheckBoxProps extends InputComponent<boolean> {
  label: string;
}

export function CheckBox({ label, value, setValue }: CheckBoxProps) {
  return (
    <div className="flex gap-1 items-center whitespace-nowrap" onClick={(e): void => setValue(!value)}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e): void => setValue(e.target.checked)}
      />
      <label>{label}</label>
    </div>
  );
}
