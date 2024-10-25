import { useState } from "react";
import styles from "./textfield.module.scss";

interface TextFieldProps {
  label?: string;
  size?: "small" | "medium" | "large";
}

function TextField({
  label = "",
  size = "small",
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
    styles[`textfield--label--${focus || value ? "focus" : ""}`]
  }`;

  return (
    <div className={styles.textfield}>
      <label className={labelClass}>
        {label}
      </label>
      <input
        type="text"
        className={`${styles[`textfield--input`]} ${
          styles[`textfield--input--${size}`]
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default TextField;
