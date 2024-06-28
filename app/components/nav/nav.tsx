import Image from "next/image";
import styles from "./nav.module.css";
export default function Nav() {
  return (
    <div>
      <div
        className={styles.navContainer}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <div className={styles.largeLogoWrapper}>
          <Image src="/image/Size=Large.svg" alt="" width={150} height={150} />
        </div>
        <div className={styles.smallLogoWrapper}>
          <Image src="/image/Size=Small.svg" alt="" width={70} height={70} />
        </div>
      </div>
    </div>
  );
}
