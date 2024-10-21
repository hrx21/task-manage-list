"use client";
import React, { ButtonHTMLAttributes, useState } from "react";
import css from "@/styles/button.module.scss";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  onClickAsync?: () => Promise<boolean>;
  setDisabledAfterClick?: boolean;
  bgcolor?: string;
  color?: string;
  hoverBorderColor?: string;
  hoverTextColor?: string;
  hoverBackground?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  disabled = false,
  onClickAsync,
  setDisabledAfterClick = false,
  bgcolor,
  color,
  hoverTextColor,
  hoverBackground,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(disabled);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    if (onClickAsync) {
      setIsLoading(true);
      try {
        const shouldDisable = await onClickAsync();
        if (setDisabledAfterClick && shouldDisable) {
          setIsButtonDisabled(true);
        } else {
          setIsButtonDisabled(false);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      style={{
        backgroundColor: isHovered ? hoverBackground : bgcolor,
        color: isHovered && hoverTextColor ? hoverTextColor : color,
        cursor: isButtonDisabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
      }}
      className={`${css.btn} ${css[variant]} ${isLoading ? "loading" : ""}`}
      disabled={isButtonDisabled || isLoading}
      onClick={handleClick}
      {...rest}
    >
      {isLoading ? <span className={css.spinner}></span> : label}
    </button>
  );
};

export default Button;
