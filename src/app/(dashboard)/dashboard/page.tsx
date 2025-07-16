"use client";

import Spinner from "@/components/dashboard/Spinner";
import { useLogout } from "@/hooks/useLogout";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Card } from "@/components/Ui/Card";
import styles from "./Page.module.scss";
import Image from "next/image";
import Button from "@/components/buttons/Button";

function DashboardPage() {
  const user = useUserInfo();
  const logout = useLogout();

  if (!user) return <Spinner />;

  return (
    <div className={styles.container}>
      <Card>
        <Card.Header
          title={`خوش آمدید ${user.title === "Mrs" ? "خانوم" : "آقای"} ${
            user.frist
          } ${user.last} 👋`}
          description="شما وارد پنل خود شده‌اید"
        />
        <Card.Content>
          <div className={styles.userInfo}>
            <div className={styles.details}>
              <p>
                <strong>ایمیل:</strong> {user.email}
              </p>
              <p>
                <strong>نام کاربری:</strong> {user.username}
              </p>
            </div>
            <div className={styles.image}>
              <Image
                src={user.picture}
                alt="User Avatar"
                className={styles.avatar}
                width={128}
                height={128}
              />
            </div>
          </div>
          <Button onClick={logout} text="خروج" />
        </Card.Content>
      </Card>
    </div>
  );
}

export default DashboardPage;
