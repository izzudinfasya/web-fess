const images = import.meta.glob("./**/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
});

export const getExReviewImages = (slug) => {
    const folderImages = Object.entries(images)
        .filter(([path]) => path.startsWith(`./${slug}/`))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, image]) => image);

    return folderImages.length
        ? folderImages
        : [images["./coming-soon.png"]];
};