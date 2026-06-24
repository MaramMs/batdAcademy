import { getCategories } from "@/action/categories";
import { redirect } from "next/navigation";

/**
 * هذه الصفحة تعمل كـ "مُحوِّل ذكي":
 * تستقبل /[locale]/course_traning/[id]
 * تبحث عن الـ slug المناسب من الـ API
 * ثم تحول 301 إلى الرابط الكامل مع الـ slug
 */
export default async function RedirectToSlugPage({ params }) {
  const { locale, id } = await params;
  const numericId = parseInt(id, 10);

  let targetSlug = 'course'; // fallback في حالة الخطأ

  // ✅ الإصلاح: redirect() تُلقي استثناءً داخلياً في Next.js
  // لا يجوز وضعها داخل try/catch لأن catch ستمسكها وتمنعها من العمل
  // لذا نفصل منطق البحث عن منطق التحويل
  try {
    const res = await getCategories(locale);
    const categories = res?.data || [];

    // 1. ابحث أولاً في top-level categories (الـ id قد يكون category)
    const matchedCategory = categories.find((cat) => cat.id == numericId);
    if (matchedCategory?.slug) {
      targetSlug = matchedCategory.slug;
    } else {
      // 2. ابحث داخل specializations في كل category
      for (const cat of categories) {
        const spec = cat.specializations?.find((s) => s.id == numericId);
        if (spec?.slug) {
          targetSlug = spec.slug;
          break;
        }
      }
    }
  } catch (error) {
    // لا نلتقط هنا إلا أخطاء الـ API الحقيقية
    console.error('[course_traning/[id]] Failed to fetch slug:', error);
  }

  // ✅ redirect() تُستدعى خارج try/catch حتى تعمل بشكل صحيح
  // ✅ encodeURIComponent: يحول الحروف العربية و & وغيرها إلى ASCII آمن للـ HTTP header
  // مثال: "دورة-إدارة" → "%D8%AF%D9%88%D8%B1%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9"
  redirect(`/${locale}/course_traning/${id}/${encodeURIComponent(targetSlug)}`);
}
