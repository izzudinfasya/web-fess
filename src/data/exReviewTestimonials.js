
const testimonialAssets = import.meta.glob(
    "../assets/testimonials/*.{png,jpg,jpeg,webp}",
    {
        eager: true,
        query: "?url",
        import: "default",
    },
);

const groupedTestimonials = {};

Object.entries(testimonialAssets).forEach(([path, image]) => {
    const filename = path.split("/").pop();

    // Mendukung nama: 01-chat.png, 01-product.jpg, dan seterusnya.
    const match = filename.match(
        /^(\d+)[-_](chat|product)\.(png|jpe?g|webp)$/i,
    );

    if (!match) {
        console.warn("[Testimonials] Nama file tidak cocok:", filename);
        return;
    }

    const [, id, type] = match;
    const normalizedType = type.toLowerCase();

    if (!groupedTestimonials[id]) {
        groupedTestimonials[id] = {
            id,
            productImage: null,
            chatImage: null,
            productName: "",
            quote: "",
            alt: `Buyer review ${id}`,
        };
    }

    if (normalizedType === "product") {
        groupedTestimonials[id].productImage = image;
    } else if (normalizedType === "chat") {
        groupedTestimonials[id].chatImage = image;
    }
});

const exReviewTestimonials = Object.values(groupedTestimonials).sort(
    (a, b) => Number(a.id) - Number(b.id),
);

export default exReviewTestimonials;
