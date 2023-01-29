import { InputComponent } from "@/types";

interface FileInputProps extends InputComponent<any> {
  label?: string;
}

export function FileInput({ label, value, setValue }: FileInputProps) {
  return (
    <div className="grid gap-1">
      {label && <label className="font-bold">{label}</label>}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setValue(e.target.files![0])}
        className="px-1 py-0.5 rounded-md border"
      />
      
    </div>
  );
}
