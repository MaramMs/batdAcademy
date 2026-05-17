import CourseByCityDetails from "./City";
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const name = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "City";
    const title = `Training Courses in ${name} | British Academy for Training & Development`;
    const description = `Explore training courses available in ${name} from the British Academy for Training & Development.`;
    return {
        title,
        description,
        openGraph: { title, description, type: "website" },
    };
}

export default function CourseByCityPage() {
    return <CourseByCityDetails />;
}
