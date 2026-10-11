import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./FAQAccordion.css";

const faqs = [
  {
    question: "Harga udah termasuk ongkir belum?",
    answer:
      "Udah kok, Harga yang tertera udah termasuk ongkir untuk seluruh Pulau Jawa. Kalau kamu di luar Pulau Jawa, langsung chat admin dulu buat cek ongkirnya.",
  },
  {
    question: "Masih bisa nego nggak?",
    answer:
      "Bisa nego tipis-tipis dong wkwk. Langsung chat admin aja, siapa tahu cocok di harga. Gaada salahnya tanya dulu kan?",
  },
  {
    question: "Kondisi barangnya gimana?",
    answer:
      "Karena semuanya barang preloved, kondisi tiap produk bisa beda-beda. Cek foto produknya dulu ya. Kalau masih penasaran atau mau lihat foto tambahan, tinggal chat admin.",
  },
  {
    question: "Barangnya udah dites sebelum dijual?",
    answer:
      "Iya, semua barang udah dites dulu sebelum dijual. Tapi kalau ada hal tertentu yang mau kamu pastiin, boleh banget tanya admin sebelum checkout.",
  },
  {
    question: "Kalau mau beli caranya gimana?",
    answer:
      "Pilih barang yang kamu mau, terus chat admin buat cek stoknya. Kalau barangnya masih tersedia, transaksi bisa langsung dilanjutkan lewat admin. Jangan lupa, pastikan transfer hanya ke rekening atas nama M. Izzudin Fasya, ya. Kalau nama rekeningnya beda, jangan lanjut transfer!",
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-accordion" aria-labelledby="faq-title">
      <div className="faq-accordion__header">
        <div>
          <span className="faq-accordion__eyebrow">NEED TO KNOW</span>

          <h2 id="faq-title" className="faq-accordion__title">
            FREQUENTLY ASKED
            <br />
            QUESTIONS<span>.</span>
          </h2>
        </div>

        <span className="faq-accordion__count">
          {String(faqs.length).padStart(2, "0")} QUESTIONS
        </span>
      </div>

      <div className="faq-accordion__list">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <div
              className={`faq-accordion__item ${isOpen ? "is-open" : ""}`}
              key={faq.question}
            >
              <button
                type="button"
                className="faq-accordion__question"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setActiveIndex(isOpen ? null : index)}
              >
                <span className="faq-accordion__number">
                  / {String(index + 1).padStart(2, "0")}
                </span>

                <span className="faq-accordion__question-text">
                  {faq.question}
                </span>

                <span className="faq-accordion__icon" aria-hidden="true">
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              <div
                className="faq-accordion__answer-wrapper"
                id={answerId}
                hidden={!isOpen}
              >
                <p className="faq-accordion__answer">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="faq-accordion__footer">
        <span>STILL HAVE QUESTIONS?</span>
        <a
          href="https://wa.me/6285179583850"
          target="_blank"
          rel="noreferrer"
          className="faq-accordion__contact"
        >
          CHAT ADMIN <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
