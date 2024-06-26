"use client";
import { useRouter } from "next/navigation";
import styles from "./nav.module.css";
export default function Nav() {
  const router = useRouter();
  return (
    <div>
      <div
        className={styles.navContainer}
        onClick={() => {
          router.push("/");
        }}
      >
        <div>사진</div>
        <div>do it;</div>
      </div>
    </div>
  );
}
