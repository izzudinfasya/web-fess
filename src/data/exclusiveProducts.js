import VXEX3Turbo from "../assets/vxe-x3-turbo.png";
import fifineK688 from "../assets/fifineK688.png";
import fifineH9 from "../assets/fifineH9.png";
import thunderbolt5 from "../assets/thunderbolt5.jpg";
import Essential60 from "../assets/essential60.png";
import CMDX from "../assets/cmd-x.webp";
import ModelX from "../assets/model-x.png";
import ATKHorizon from "../assets/atk-horizon.webp";
import VXEDragonfly from "../assets/vxe-dragonfly-v3.webp";
import WLMouse from "../assets/wlmouse-beast-x-pro.png";
import ventionDashPro from "../assets/vention-dash-pro.png";
import Win11 from "../assets/win-11-pro.png";
import Office2021 from "../assets/office-2021.png";

export const products = [
    {
        title: "VXE X3 Turbo",
        discount: "5% OFF",
        code: "FESS",
        image: VXEX3Turbo,
        link:
            "https://www.atk.store/products/vxe-dragonfly-x3-series-lightweight-wireless-mouse?ref=FESS",
    },
    {
        title: "FIFINE K688 Mic",
        discount: "",
        code: "",
        image: fifineK688,
        link:
            "https://link.fifinedesign.com/K688-fesnotyours",
    },
    {
        title: "Model-X 2.0 Stand",
        discount: "10% OFF",
        code: "FESS10",
        image: ModelX,
        link:
            "https://stxnd.com/products/laptop-stand-model-x?variant=45217096859889?bg_ref=hdMlfoOW4woeFq9e4NzghqEMSQ_aem_BR0hcuvWJ7d4A81leTUBiw",
    },
    {
        title: "FIFINE H9 Headset",
        discount: "",
        code: "",
        image: fifineH9,
        link:
            "https://link.fifinedesign.com/H9-fesnotyours",
    },
    {
        title: "Razer Thunderbolt™ 5 Dock",
        discount: "",
        code: "",
        image: thunderbolt5,
        link:
            "https://www.razer.com/gaming-pc-accessories/razer-thunderbolt-5-dock/RC21-02290100-R3U1?irclickid=RQ8UVTygtxyZWcYXSWRas2onUkr0o909qUmXT00&irgwc=1&afsrc=1&utm_source=Fess&utm_medium=affiliate&utm_content=7545630&utm_term=Fess&utm_sharedid=&cid=Fess-affiliate",
    },
    {
        title: "WLMouse Beast X Pro",
        discount: "2% OFF",
        code: "FESS",
        image: WLMouse,
        link:
            "https://www.wlmouse.com/products/x-pro?ref=fess",
    },
    {
        title: "Essential60 HE",
        discount: "NEW ARRIVAL",
        code: "",
        image: Essential60,
        link:
            "https://pressplayid.com/products/essential60-he-60-rapid-trigger-mechanical-keyboard",
    },
    {
        title: "VXE Dragonfly V3 Series",
        discount: "5% OFF",
        code: "FESS",
        image: VXEDragonfly,
        link:
            "https://www.atk.store/products/vxe-dragonfly-v3-series-lightweight-wireless-mouse?ref=FESS",
    },
    {
        title: "CMD-X Keyboard + Mouse",
        discount: "10% OFF",
        code: "FESS10",
        image: CMDX,
        link:
            "https://stxnd.com/products/cmd-x-keyboard-combo?variant=47254584164593?bg_ref=hdMlfoOW4woeFq9e4NzghqEMSQ_aem_BR0hcuvWJ7d4A81leTUBiw",
    },
    {
        title: "ATK Horizon IEM",
        discount: "5% OFF",
        code: "FESS",
        image: ATKHorizon,
        link:
            "https://www.atk.store/products/atk-horizon-dsp-gaming-in-ear-earphones?ref=FESS",
    },
    {
        title: "Vention Dash Pro",
        code: "",
        image: ventionDashPro,
        link:
            "https://shopee.co.id/product/391830606/43829817522/?smtt=9&uls_trackid=56djohbm00im&utm_campaign=s391830606_ss_id_ttip_fesnotyours&utm_medium=seller&utm_source=tiktok",
    },
    {
        title: "Win 11 Pro",
        discount: "52% OFF",
        code: "FES52",
        image: Win11,
        link:
            "https://shop.beacons.ai/fesnotyours/125b0f98-ef74-487c-b0f3-814f8a7310ae",
    },
    {
        title: "Office 2021 Pro Plus",
        discount: "62% OFF",
        code: "FES62",
        image: Office2021,
        link:
            "https://shop.beacons.ai/fesnotyours/adf02488-8376-428c-9791-97699f6787e2",
    },
].map((product, index) => ({
    ...product,
    id: index + 1,
}));