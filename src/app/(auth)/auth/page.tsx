"use client";
import { Card, CardHeader } from "@/components/Ui/Card";
import styles from "./page.module.scss";
import TextField from "@/components/inputs/TextField";
import { useState } from "react";
import { AuthErrors, validateField } from "@/components/auth/ValidateAuthForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import { useFetchMutation } from "@/hooks/useFormSubmit";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useRedirectIfAuthenticated();

  const [errors, setErrors] = useState<AuthErrors>({});
  const { mutate, isLoading, error } = useFetchMutation(
    "https://randomuser.me/api/?results=1&nat=us"
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { errors } = validateField(name as keyof AuthErrors, value);

    setErrors((prev) => {
      const updated = { ...prev };

      const errorMsg = errors[name as keyof AuthErrors];

      if (errorMsg) {
        updated[name as keyof AuthErrors] = errorMsg;
      } else {
        delete updated[name as keyof AuthErrors];
      }

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { errors: emailError } = validateField("email", email);
    const { errors: passwordError } = validateField("password", password);
    const { errors: phoneErrors } = validateField("phone", phone);
    if (emailError.email || passwordError.password || phoneErrors.phone) {
      errors.email = emailError.email;
      errors.password = passwordError.password;
      errors.phone = phoneErrors.phone;
    } else {
      delete errors.email;
      delete errors.password;
      delete errors.phone;
      mutate();
    }
  };
  return (
    <div className={styles.wrapper}>
      <Card>
        <CardHeader
          title="خوش آمدید"
          description="برای ورود اطلاعات خود را وارد کنید"
        />
        <Card.Content>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ایمیل"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              errors={errors}
            />
            <TextField
              label="رمز عبور"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
              type="password"
              errors={errors}
            />
            <TextField
              label="شماره تماس"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handleBlur}
              type="number"
              prefix="98+"
              errors={errors}
            />
            {error?.message && <p>{error.message}</p>}
            <SubmitButton text="ورود به پنل کاربری" isPending={isLoading} />
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
export default LoginPage;
