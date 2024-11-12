"use client";

import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import styles from "./textfield.module.scss";
import Image from "next/image";
import Typography from "../typography";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  size?: "small" | "medium" | "large";
  leadIconUrl?: string;
  errorMessage?: string;
  disabled?: boolean;
}

function TextField({
  value,
  onValueChange,
  label,
  placeholder,
  className,
  id,
  size = "small",
  leadIconUrl,
  errorMessage,
  disabled = false,
  ...props
}: TextFieldProps) {
  const [inputValue, setValue] = useState(value || "");
  const [focus, setFocus] = useState(value ? true : false);

  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value]);

  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    if (!inputValue) {
      setFocus(false);
    }
  }

  const labelClass = `
    ${styles["textfield--label"]} 
    ${(focus || inputValue) ? styles["textfield--label--focus"] : ""}
    ${
    (leadIconUrl && (focus || inputValue))
      ? styles["textfield--label--focus--icon"]
      : ""
  }
    ${
    (!focus && !inputValue && leadIconUrl)
      ? styles["textfield--label--icon"]
      : ""
  }
    ${errorMessage ? styles["textfield--label--message"] : ""}
    ${disabled ? styles["textfield--label--disabled"] : ""}
  `;

  const inputClass = `
    ${styles["textfield--input"]} 
    ${styles[`textfield--input--${size}`]} 
    ${leadIconUrl ? styles["textfield--input--icon"] : ""}
    ${errorMessage ? styles["textfield--input--message"] : ""}
  `;

  const messageClass = `
    ${styles["textfield--message"]} 
    ${disabled ? styles["textfield--message--disabled"] : ""}
  `;

  return (
    <div className={`${styles.textfield} ${className ? className : ""}`}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      {leadIconUrl && (
        <Image
          className={`${styles[`textfield--lead-icon`]}`}
          src={leadIconUrl}
          alt="Leading Icon"
          width={24}
          height={24}
        />
      )}
      <input
        type="text"
        className={inputClass}
        value={inputValue}
        onChange={handleValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={(placeholder && focus) || (!label) ? placeholder : ""}
        {...props}
      />
      {errorMessage && (
        <Typography variant="note" className={messageClass}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

export default TextField;
