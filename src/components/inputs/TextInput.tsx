import { BaseComponent, InputComponent } from "@/types";

interface TextInputProps extends BaseComponent, InputComponent<string> {
  label?: string;
}

export function TextInput({ label, value, setValue, className }: TextInputProps) {
  return (
    <div className={`grid gap-1 w-full ${className}`}>
      {label && <label className="font-bold">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-1 text-black overflow-hidden outline-none 
          border-b focus:border-b-2 border-blue-primary"
      />
    </div>
  );
}
