import { getMeta } from "@/action/meta";
import Header from "./Header";
import ContactForm from "./ContactForm";
import OurOffices from "./OurOffices";
import styles from "@/sass/pages/contact/contact.module.scss";
import container from "@/sass/components/common/container.module.scss";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const fallback = {
        title: "Contact Us | British Academy for Training & Development",
        description: "Contact the British Academy for Training & Development for inquiries, support, or partnership opportunities.",
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/favicon.ico",
        },
    };

    try {
        const res = await getMeta(locale, "contact-us");
        const meta = res?.meta;
        if (!meta) return fallback;

        const title = meta?.title || fallback.title;
        const description = meta?.description?.replace(/<[^>]*>?/gm, '') || fallback.description;

        let keywords = meta?.keyword;
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
            icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/favicon.ico",
            },
            openGraph: {
                title,
                description,
                type: "website",
                siteName: "British Academy for Training & Development",
                images: [
                    {
                        url: '/og-image.png',
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            },

            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [{ url: '/og-image.png', width: 1200, height: 630 }],
            },
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return fallback;
    }
}
export default async function ContactPage() {
    return (
        <section className={styles.contact}>
            <Header />
            <div className={styles.mainContent}>
                <div className={container.container}>
                    <div className={styles.grid}>
                        <ContactForm />
                        <OurOffices />
                    </div>
                </div>
            </div>
        </section>
    );
}

