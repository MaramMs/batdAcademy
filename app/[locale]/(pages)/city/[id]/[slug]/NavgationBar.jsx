import styles from "@/sass/pages/course-details-by-city/navgation-bar.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import { ArrowLeft, ArrowRight, House } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useLanguageStore from "@/store/useLanguageStore";
const NavgationBar = () => {
  const locale = useLanguageStore();
  const params = useParams();
  const cityName = decodeURIComponent(params?.slug || params?.slug || "");
  const t = useTranslations("NavBar");
  return (
    <section className={styles.navgationBar}>
      <div className={stylesContainer.container}>
        <div className={styles.wrapper}>
          <div className={styles.breadcrumb}>
            <ArrowLeft color="#2F327D" size={20} />
            <span>{t("backToCourse")}</span>
          </div>
          <span>|</span>
          <House color="#4A5565" size={20} />
          <ArrowRight color="#4A5565" size={20} />
          <span>{t("cities")}</span>
          {locale === "ar" ? (
            <ArrowRight />
          ) : (
            <ArrowLeft color="#4A5565" size={20} />
          )}

          <span>{cityName}</span>
        </div>
      </div>
    </section>
  );
};
export default NavgationBar;
