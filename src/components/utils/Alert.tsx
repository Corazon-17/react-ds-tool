import { useEffect, useState } from "react";
import { ImWarning, ImInfo } from "react-icons/im";
import { FiCheckCircle } from "react-icons/fi";

interface AlertProps {
  text: string;
  type?: "success" | "error" | "warning" | "info";
}

export function Alert({ text, type = "info" }: AlertProps) {
  let Icon, textColor, borderColor;
  const [show, setShow] = useState<boolean>(true);

  switch (type) {
    case "info":
      Icon = ImInfo;
      textColor = "text-blue-700";
      borderColor = "border-blue-700";
      break;
    case "success":
      Icon = FiCheckCircle;
      textColor = "text-green-700";
      borderColor = "border-green-700";
      break;
    case "warning":
      Icon = ImWarning;
      textColor = "text-yellow-700";
      borderColor = "border-yellow-700";
      break;
    case "error":
      Icon = ImWarning;
      textColor = "text-red-700";
      borderColor = "border-red-700";
      break;
  }

  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } gap-2 items-center border-t-4 py-2 px-4 bg-slate-100 ${textColor} ${borderColor}`}
    >
      <Icon />
      <p>{text}</p>
    </div>
  );
}
