import { getPostBySlug } from "@/action/posts";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
import { buildAlternates, SITE_URL } from "@/lib/seoMeta";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/blog/blog-details.module.scss";
import ArticleParts from "./ArticleParts";
import Header from "./Header";
import MainContent from "./MainContent";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  const niceName = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Article";

  const fallback = {
    title: `${niceName} | British Academy for Training & Development`,
    description: `Read this article from the British Academy for Training & Development blog.`,
  };

  try {
    const response = await getPostBySlug(locale, slug);
    const res = response?.data;
    if (!res) return fallback;

    const meta = res.meta || {};
    const title = meta.title || res.name || fallback.title;
    const description =
      meta.description?.replace(/<[^>]*>?/gm, "") ||
      res.description ||
      fallback.description;

    let keywords = meta.keyword;
    if (keywords && typeof keywords === "string" && keywords.startsWith("[")) {
      try {
        const parsed = JSON.parse(keywords);
        keywords = parsed.map((k) => k.value).join(", ");
      } catch (e) {
        console.error("Error parsing keywords:", e);
      }
    }

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      keywords: keywords || undefined,
      alternates: {
        canonical: `/${locale}/post/${slug}`,
        ...buildAlternates(`/post/${slug}`),
      },

      openGraph: {
        title,
        description,
        type: "article",
       
        ...(res?.image
          ? { images: [res.image] }
          : {
              images: [
                {
                  url: "/og-image.png",
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ],
            }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(res?.image
          ? { images: [res.image] }
          : {
              images: [
                {
                  url: "/og-image.png",
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ],
            }),
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return { ...fallback, openGraph: { ...fallback, type: "article" } };
  }
}

export default async function BlogDetailsPage({ params }) {
  const { locale, id, slug } = await params;
  let blogData = {};
  try {
    const res = await getPostBySlug(locale, slug);
    blogData = res?.data || {};
  } catch (error) {
    console.error("Failed to fetch course details:", error);
  }
  return (
    <>
      {blogData?.slug_en && blogData?.slug_ar && (
        <AlternatePathsSetter
          enPath={`/post/${blogData.slug_en}`}
          arPath={`/post/${blogData.slug_ar}`}
        />
      )}
      <div className={styles.blogDetailsPage}>
        <Header post={blogData} />
        <div className={styleContainer.container}>
          <div className={styles.content}>
            <ArticleParts post={blogData} />
            <MainContent post={blogData} />
          </div>
        </div>
      </div>
    </>
  );
}
