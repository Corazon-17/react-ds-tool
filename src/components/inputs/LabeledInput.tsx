import { InputComponent } from "@/types";

interface LabeledInputProps extends InputComponent<{}> {
  label?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  setValue,
}) => {
  const objKeys = Object.keys(value);
  const objValues = Object.values(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newValue = Number(e.target.value);
    if (!Number.isNaN(newValue)) {
      const newObject = Object.fromEntries(
        objKeys.map((key, i) => [
          key,
          i === idx ? Number(e.target.value) : objValues[i],
        ])
      );

      setValue(newObject);
    }
  };
  return (
    <div className="grid gap-1">
      <label>{label}</label>
      {objKeys.map((key, i) => (
        <div key={i} className="grid grid-cols-[70%_30%] overflow-hidden">
          <input value={key} className="px-2 w-max" disabled />
          <input
            className="text-black px-2"
            value={objValues[i] as number}
            onChange={(e) => handleChange(e, i)}
          />
        </div>
      ))}
    </div>
  );
};
