"use client";

import React, { InputHTMLAttributes } from "react";
import styles from "./TextField.module.scss";
import { AuthErrors } from "@/components/auth/ValidateAuthForm";

type FloatingTextFieldProps = {
  label: string;
  errors?: AuthErrors;
  name: keyof AuthErrors;
  prefix?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  label,
  errors,
  name,
  type = "text",
  placeholder,
  value,
  prefix,
  onChange,
  ...rest
}: FloatingTextFieldProps) {
  const hasContent = value !== undefined && value !== "";

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          dir="ltr"
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || " "}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${hasContent ? styles.filled : ""}`}
          {...rest}
        />
        <label
          htmlFor={name}
          className={`${styles.label} ${hasContent ? styles.shrink : ""}`}
        >
          {label}
        </label>
      </div>

      {errors && name && errors[name] && (
        <p className={styles.p}>{errors[name]}</p>
      )}
    </div>
  );
}
