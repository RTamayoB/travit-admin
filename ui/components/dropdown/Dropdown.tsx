"use client";

import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./dropdown.module.scss";
import Image from "next/image";
import Typography from "../typography";

export interface DropdownOption<T> {
  key: T;
  value: string;
}

interface DropdownProps<T>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  options: DropdownOption<T>[];
  defaultOption?: DropdownOption<T>;
  onOptionSelected: (key: T) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  size?: "small" | "medium" | "large";
  leadIconUrl?: string;
  errorMessage?: string;
  disabled?: boolean;
}

function Dropdown<T>({
  options,
  defaultOption,
  onOptionSelected,
  label,
  placeholder,
  className,
  id,
  size = "small",
  leadIconUrl,
  errorMessage,
  disabled = false,
  ...props
}: DropdownProps<T>) {
  const [inputValue, setInputValue] = useState(defaultOption?.value || "");
  const [focus, setFocus] = useState(!!defaultOption?.value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOption) {
      setInputValue(defaultOption.value);
    }
  }, [defaultOption]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(newValue.toLowerCase())
      ),
    );
    setShowOptions(true);
  }

  function handleFocus() {
    setFocus(true);
    setShowOptions(true);
  }

  function handleBlur() {
    if (!inputValue) {
      setFocus(false);
    }
  }

  function handleOptionClick(option: DropdownOption<T>) {
    setInputValue(option.value);
    setShowOptions(false);
    onOptionSelected(option.key);
  }

  const labelClass = `
    ${styles["dropdown--label"]} 
    ${(focus || inputValue) ? styles["dropdown--label--focus"] : ""}
    ${
    (leadIconUrl && (focus || inputValue))
      ? styles["dropdown--label--focus--icon"]
      : ""
  }
    ${
    (!focus && !inputValue && leadIconUrl)
      ? styles["dropdown--label--icon"]
      : ""
  }
    ${errorMessage ? styles["dropdown--label--message"] : ""}
    ${disabled ? styles["dropdown--label--disabled"] : ""}
  `;

  const inputClass = `
    ${styles["dropdown--input"]} 
    ${styles[`dropdown--input--${size}`]} 
    ${leadIconUrl ? styles["dropdown--input--icon"] : ""}
    ${errorMessage ? styles["dropdown--input--message"] : ""}
  `;

  const messageClass = `
    ${styles["dropdown--message"]} 
    ${disabled ? styles["dropdown--message--disabled"] : ""}
  `;

  return (
    <div
      className={`${styles.dropdown} ${className ? className : ""}`}
      ref={dropdownRef}
    >
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      {leadIconUrl && (
        <Image
          className={`${styles[`dropdown--lead-icon`]}`}
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
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={(placeholder && focus) || (!label) ? placeholder : ""}
        {...props}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className={styles["dropdown--options"]}>
          {filteredOptions.map((option) => (
            <li
              key={String(option.key)}
              className={styles["dropdown--option"]}
              onClick={() => handleOptionClick(option)}
            >
              <Typography variant="bodySmall">
                {option.value}
              </Typography>
            </li>
          ))}
        </ul>
      )}
      {errorMessage && (
        <Typography variant="note" className={messageClass}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

export default Dropdown;
