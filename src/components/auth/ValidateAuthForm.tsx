type FormData = {
  email: string;
  password: string;
  phone: string;
};

export type AuthErrors = Partial<Record<keyof FormData, string>>;

export function validateField(
  name: keyof FormData,
  value: string
): { errors: Partial<Record<keyof FormData, string>>; isValid: boolean } {
  const errors: AuthErrors = {};
  if (name === "email") {
    if (!value.trim()) {
      errors.email = "ایمیل نباید خالی باشد";
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      errors.email = "فرمت ایمیل صحیح نیست";
    }
  }

  if (name === "password") {
    if (!value) {
      errors.password = "رمز عبور نباید خالی باشد";
    } else if (value.length < 6) {
      errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
  }
  if (name === "phone") {
    if (!value.trim()) {
      errors.phone = "لطفا شماره تماس خود را وارد کنید";
    } else if (!/^9\d{9}$/.test(value)) {
      errors.phone = "شماره تماس صحیح نیست";
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
}
