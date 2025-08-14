"use client";

import React, {
  ChangeEvent,
  MutableRefObject,
  forwardRef,
  SelectHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type FilterSelectOption<KeyT extends string | number = number> = {
  key: KeyT;
  value: string;
};

interface FilterSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: FilterSelectOption[];
  inputPlaceholder?: string;
  className?: string;
}

function mergeRefs<T = any>(
  ...refs: (React.Ref<T> | undefined)[]
): (instance: T | null) => void {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(instance);
      } else {
        try {
          (ref as MutableRefObject<T | null>).current = instance;
        } catch {}
      }
    });
  };
}

const FilterSelect = forwardRef<HTMLSelectElement, FilterSelectProps>(
  ({ options, inputPlaceholder = "Type to filter...", className, ...selectProps }, outerRef) => {
    const internalSelectRef = useRef<HTMLSelectElement | null>(null);
    const combinedRef = useMemo(
      () => mergeRefs<HTMLSelectElement>(outerRef, (selectProps as any).ref),
      [outerRef, (selectProps as any).ref]
    );

    const [filter, setFilter] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string | number | undefined>(undefined);

    // Initialize selectedKey from the hidden select (RHF defaultValues)
    useEffect(() => {
      const current = internalSelectRef.current;
      if (current && current.value !== "") {
        setSelectedKey(current.value);
      }
    }, [options]);

    const filtered = useMemo(() => {
      const f = filter.trim().toLowerCase();
      if (!f) return options;
      return options.filter((o) => o.value.toLowerCase().includes(f));
    }, [options, filter]);

    const selectedLabel = useMemo(() => {
      const opt = options.find((o) => String(o.key) === String(selectedKey));
      return opt?.value ?? "";
    }, [options, selectedKey]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
      setOpen(true);
    };

    const handleOptionClick = (opt: FilterSelectOption) => {
      setSelectedKey(opt.key);
      setFilter("");
      setOpen(false);

      const selectEl = internalSelectRef.current;
      if (selectEl) {
        selectEl.value = String(opt.key);
      }

      // Notify RHF via the select's onChange
      const onChange = (selectProps as any).onChange as ((e: any) => void) | undefined;
      if (onChange) {
        onChange({ target: { name: (selectProps as any).name, value: String(opt.key) } });
      }
    };

    return (
      <div className={className} style={{ position: "relative" }}>
        {/* Visible input (single control appearance) */}
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={open || filter ? filter : selectedLabel}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          disabled={selectProps.disabled}
          style={{ display: "block", width: "100%" }}
        />

        {/* Simple dropdown list */}
        {open && filtered.length > 0 && (
          <ul
            style={{
              position: "absolute",
              zIndex: 10,
              margin: 0,
              padding: 0,
              listStyle: "none",
              background: "white",
              border: "1px solid #ddd",
              width: "100%",
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {filtered.map((o) => (
              <li
                key={String(o.key)}
                style={{ padding: 8, cursor: "pointer" }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleOptionClick(o)}
              >
                {o.value}
              </li>
            ))}
          </ul>
        )}

        {/* Hidden select bound to RHF */}
        <select
          ref={(el) => {
            internalSelectRef.current = el;
            combinedRef(el);
          }}
          {...selectProps}
          style={{ display: "none" }}
        >
          {options.map((o) => (
            <option key={String(o.key)} value={o.key}>
              {o.value}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

FilterSelect.displayName = "FilterSelect";

export default FilterSelect;

