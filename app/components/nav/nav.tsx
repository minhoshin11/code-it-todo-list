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
        <img src="/image/Size=Large.svg" alt="" />
      </div>
    </div>
  );
}
