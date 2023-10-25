import { ChangeEvent, useState } from "react";

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValue(e.target.value);
  }
  function clearValue() {
    setValue("");
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
    clear: clearValue,
  };

  return inputProps;
}
