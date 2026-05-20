import { getCoursesByCity } from "@/action/cities";
import CourseByCityDetails from "./City";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
export async function generateMetadata({ params }) {
    const { locale, slug } = await params;
    const name = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "City";
    const fallback = {
        title: `Training Courses in ${name} | British Academy for Training & Development`,
        description: `Explore training courses available in ${name} from the British Academy for Training & Development.`,
    };
    try {
         const response = await getCoursesByCity(locale, slug);
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
                 ...(res?.image ? { images: [res.image] } : {
                     images: [{
                         url: '/og-image.png',
                         width: 1200,
                         height: 630,
                         alt: title,
                     }],
                 }),
             },
             twitter: {
                 card: "summary_large_image",
                 title,
                 description,
                 ...(res?.image ? { images: [res.image] } : {
                     images: [
                         {
                             url: '/og-image.png',
                             width: 1200,
                             height: 630,
                             alt: title,
                         },
                     ],
                 }),
             }
         };
     } catch (error) {
         console.error("Metadata error:", error);
         return { ...fallback, openGraph: { ...fallback, type: "article" } };
     }
}

export default async function CourseByCityPage({params}) {
          const { locale, slug } = await params;    
          let cityData = {};
          try {
              const res = await getCoursesByCity(locale, slug);
              cityData = res?.data || {};
          } catch (error) {
            console.error("Failed to fetch city details:", error);
          }
          
        return (
            <>
              {cityData?.slug_en && cityData?.slug_ar && (
                        <AlternatePathsSetter
                        enPath={`/city/${cityData.id}/${cityData.slug_en}`}
                        arPath={`/city/${cityData.id}/${cityData.slug_ar}`}
                        />
                    )}
            <CourseByCityDetails  />
            
            </>
            
            );
}
