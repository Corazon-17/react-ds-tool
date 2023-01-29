import { Dispatch } from "react";

export type Theme = "light" | "dark";
export type Dataset = Array<{}>;
export type Operator = "+" | "-" | "x" | "/" | "**" | "%";
export type ValueSetter<Type> = Dispatch<React.SetStateAction<Type>>;

export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface InputComponent<Type> {
  value: Type;
  setValue: ValueSetter<Type>;
}

export interface PageComponent {
  dataset: Dataset;
}
