import "./AnnouncementMarquee.css";

const announcements = [
  "HARGA SUDAH TERMASUK ONGKIR SE-PULAU JAWA",
  "NEGO TIPIS? BOLEH, LANGSUNG CHAT ADMIN",
  "CEK KONDISI BARANG SEBELUM CHECKOUT",
];

export default function AnnouncementMarquee() {
  return (
    <div
      className="announcement-marquee"
      role="region"
      aria-label="Informasi pembelian"
    >
      <div className="announcement-marquee__track">
        {[0, 1, 2, 3].map((copy) => (
          <div
            className="announcement-marquee__group"
            key={copy}
            aria-hidden={copy !== 0}
          >
            {announcements.map((announcement, index) => (
              <span
                className="announcement-marquee__item"
                key={`${copy}-${index}`}
              >
                <span className="announcement-marquee__dot" />
                {announcement}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
