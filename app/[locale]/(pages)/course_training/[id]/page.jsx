import { getCategories } from "@/action/categories";
import { redirect } from "next/navigation";

export default async function RedirectToSlugPage({ params }) {
  const { locale, id } = await params;

  // نعرف المتغير خارج الـ try لتكون قيمته قابلة للقراءة بالأسفل
  let targetSlug = "course"; 

  try {
    // 1. جلب كل التصنيفات
    const res = await getCategories(locale);
    console.log('--- تم جلب البيانات بنجاح في صفحة الـ ID ---');
    
    const categories = res?.data || [];

    // 2. البحث عن التخصص المطابق للـ id
    for (const cat of categories) {
      const spec = cat.specializations?.find((s) => s.id == id);
      if (spec) {
        targetSlug = spec.slug;
        break; // وجدناه، نخرج من الحلقة
      }
    }
  } catch (error) {
    // إذا حدث خطأ حقيقي في الـ API، سيتم طباعته هنا دون تدمير الـ redirect
    console.error("Failed to fetch categories for slug redirection:", error);
  }

  // 🚨 الحل السحري هنا: الـ redirect يتم استدعاؤه خارج الـ try/catch تماماً
  // تذكري تعديل كلمة course_training إذا كان مجلدكِ مكتوباً بشكل آخر
  redirect(`/${locale}/course_training/${id}/${encodeURIComponent(targetSlug)}`);
}