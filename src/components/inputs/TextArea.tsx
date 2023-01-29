import { InputComponent } from "@/types";

interface TextAreaProps extends InputComponent<string> {
  label?: string;
}

export function TextArea({ label, value, setValue }: TextAreaProps) {
  return (
    <div className="grid gap-1 w-full">
      {label && <label className="font-bold">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-40 p-1 text-black rounded-lg overflow-hidden outline-none 
          border focus:border-2 border-blue-primary
          selection:bg-decor-primary selection:text-white"
      />
    </div>
  );
}
