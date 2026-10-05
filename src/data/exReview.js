import { getExReviewImages } from "../assets/ex-review";

const createSlug = (brand, name) =>
    `${brand} ${name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const getDropStatus = (items) => {
    const availableCount = items.filter((item) => item.qty > 0).length;

    if (availableCount === 0) {
        return "SOLD OUT";
    }

    if (availableCount === items.length) {
        return "AVAILABLE";
    }

    return "PARTIALLY SOLD";
};

const rawDrops = [
    {
        date: "OCT 2026",
        items: [
            {
                brand: "FURYCUBE",
                name: "M68 HE - Custom",
                category: "RAPID TRIGGER KEYBOARD",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp450.000",
                condition: "9/10",
                included: "Original box, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "OXIMUS",
                name: "ZDP1118",
                category: "BRACKET MONITOR",
                type: "PERSONAL",
                qty: 1,
                usedFor: "Used for 1 years",
                price: "Rp150.000",
                condition: "9/10",
                included: "Original box, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "AJAZZ",
                name: "AJ139 V2 MC",
                category: "WIRELESS MOUSE",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp250.000",
                condition: "9/10",
                included: "Original box, Charging Dock, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "FANTECH",
                name: "Leviousa Aura MCX04",
                category: "MICROPHONE",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp450.000",
                condition: "9/10",
                included: "Original box, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "PRESSPLAY",
                name: "SPIRIT",
                category: "WIRELESS MOUSE",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp250.000",
                condition: "8.5/10",
                included: "Original box, Charging Dock, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "AULA",
                name: "F75 Pro",
                category: "MECHANICAL KEYBOARD",
                type: "PERSONAL",
                qty: 1,
                usedFor: "Used for 1 years",
                price: "Rp600.000",
                condition: "9/10",
                included: "Original box, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "FURYCUBE",
                name: "F1",
                category: "WIRELESS MOUSE",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp300.000",
                condition: "9/10",
                included: "Original box, Charging Dock, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "GALATIX",
                name: "YATAGARASU",
                category: "MOUSEPAD",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp100.000",
                condition: "8/10",
                included: "Original box",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "KEYCHRON",
                name: "BM24",
                category: "WIRELESS MOUSE",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp350.000",
                condition: "9/10",
                included: "Original box",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
            {
                brand: "FANTECH",
                name: "ATOM HE68",
                category: "RAPID TRIGGER KEYBOARD",
                type: "EX-REVIEW",
                qty: 1,
                usedFor: "Used for review",
                price: "Rp350.000",
                condition: "9/10",
                included: "Original box, Accessories",
                whatsapp: "https://wa.me/+6285179583850",
                shopee: "https://shopee.co.id/your-link",
                reviewUrl:
                    "https://www.tiktok.com/@fesnotyours/video/XXXXXXXX",
            },
        ],
    },
];

export const exReviewDrops = rawDrops.map((drop, dropIndex) => {
    const items = drop.items.map((item, itemIndex) => {
        const slug = createSlug(item.brand, item.name);

        return {
            ...item,
            id: String(itemIndex + 1).padStart(2, "0"),
            slug,
            images: getExReviewImages(slug),
        };
    });

    return {
        ...drop,
        id: String(dropIndex + 1).padStart(3, "0"),
        status: getDropStatus(items),
        items,
    };
});