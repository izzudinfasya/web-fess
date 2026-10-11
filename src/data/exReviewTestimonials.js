const testimonialAssets = import.meta.glob(
    "../assets/testimonials/*.{png,jpg,jpeg,webp}",
    {
        eager: true,
        query: "?url",
        import: "default",
    },
);

const loadedTestimonials = Object.entries(testimonialAssets)
    .map(([path, image]) => {
        const filename = path.split("/").pop();
        const id = filename.match(/^(\d+)\./)?.[1];

        if (!id) return null;

        return {
            id,
            image,
            alt: `WhatsApp feedback from buyer ${id}`,
        };
    })
    .filter(Boolean)
    .sort((a, b) => Number(a.id) - Number(b.id));

const exReviewTestimonials = loadedTestimonials.length
    ? loadedTestimonials
    : [
        {
            id: "01",
            image: null,
            alt: "WhatsApp feedback from buyer 01",
        },
        {
            id: "02",
            image: null,
            alt: "WhatsApp feedback from buyer 02",
        },
        {
            id: "03",
            image: null,
            alt: "WhatsApp feedback from buyer 03",
        },
        {
            id: "04",
            image: null,
            alt: "WhatsApp feedback from buyer 03",
        },
    ];

export default exReviewTestimonials;