import { getConsultantWithService } from "@/action/consulting";
import ConsultingService from "./ConsultingService";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const niceName = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Consulting";

   const fallback = {
        title: `${niceName} | British Academy for Training & Development`,
        description: `Learn more about ${niceName} consulting services offered by the British Academy for Training & Development.`,
    };

    try {
        const response = await getConsultantWithService(locale, slug);
        const res = response?.data;
        if (!res) return fallback;

        const meta = res.meta || {};
        const title = meta.title || res.name || fallback.title;
        const description = meta.description?.replace(/<[^>]*>?/gm, '') || res.description || fallback.description;
        
        let keywords = meta.keyword;
        if (keywords && typeof keywords === 'string' && keywords.startsWith("[")) {
            try {
                const parsed = JSON.parse(keywords);
                keywords = parsed.map(k => k.value).join(", ");
            } catch (e) {
                console.error("Error parsing keywords:", e);
            }
        }

        return {
            title,
            description,
            keywords: keywords || undefined,
            openGraph: {
                title,
                description,
                type: "article",
                ...(res.image ? { images: [res.image] } : {}),
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                ...(res.image ? { images: [res.image] } : {}),
            }
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return { ...fallback, openGraph: { ...fallback, type: "article" } };
    }
}


export default async function ConsultingServicePage({ params, searchParams }) {
      const { locale, slug } = await params;
      const resolvedSearchParams = await searchParams;
            const paramsString = new URLSearchParams(resolvedSearchParams).toString();
      const queryString = paramsString ? `?${paramsString}` : "";

      let serviceData = {};
      try {
          const res = await getConsultantWithService(locale, slug, queryString);
          serviceData = res?.data || {};
          console.log(serviceData, "params in consulting details page");
      } catch (error) {
        console.error("Failed to fetch consulting details:", error);
      }
    return (
      <>
        {serviceData?.slug_en && serviceData?.slug_ar && (
          <AlternatePathsSetter
            enPath={`/consulting/${serviceData.slug_en}`}
            arPath={`/consulting/${serviceData.slug_ar}`}
          />
        )}
        <ConsultingService serviceData={serviceData}/>
      </>
    );
}
