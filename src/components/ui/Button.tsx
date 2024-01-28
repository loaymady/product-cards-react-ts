/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, ReactNode, memo } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  width?: "w-full" | "w-fit";
}

const Button = ({
  className,
  children,
  width = "w-full",
  type,
  ...rest
}: IProps) => {
  return (
    <button
      type={type}
      className={`${className} ${width} rounded-lg text-white px-3 py-3 duration-200 font-medium`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
