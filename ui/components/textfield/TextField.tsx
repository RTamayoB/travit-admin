import { useState } from "react";
import styles from "./textfield.module.scss";
import Image from "next/image";

interface TextFieldProps {
  label?: string;
  size?: "small" | "medium" | "large";
  leadIconUrl?: string;
  errorMessage?: string
  disabled?: false
}

function TextField({
  label = "",
  size = "small",
  leadIconUrl,
  errorMessage,
  disabled
}: TextFieldProps) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    if (!value) {
      setFocus(false);
    }
  }

  const labelClass = `${styles[`textfield--label`]} ${
    (focus || value) ? styles[`textfield--label--focus`] : ''
  } ${
    leadIconUrl && (focus || value) ? styles[`textfield--label--focus--icon`] : ''
  } ${
    !focus && !value && leadIconUrl ? styles[`textfield--label--icon`] : ''
  }
  ${
    errorMessage ? styles[`textfield--label--message`] : ''
  }
  ${disabled ? styles[`textfield--label--disabled`] : ''}
  `;

  const inputClass = `${styles[`textfield--input`]} ${
    styles[`textfield--input--${size}`]} ${
    leadIconUrl ? styles[`textfield--input--icon`] : ''
  }
  ${
    errorMessage ? styles[`textfield--input--message`] : ''
  }`;

  const messageClass =  `${styles[`textfield--message`]}  ${disabled ? styles[`textfield--message--disabled`] : ''}`;

  return (
    <div className={styles.textfield}>
      <label className={labelClass}>
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      {errorMessage && (
        <p className={messageClass}>{errorMessage}</p>
      )}
    </div>
  );
}

export default TextField;
