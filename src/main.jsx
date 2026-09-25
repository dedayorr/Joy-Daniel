import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  QrCode,
  Ticket,
  Quote,
  Send,
  AlertTriangle,
  X,
} from "lucide-react";
import "./styles.css";

import logo from "./assets/logo.jpg";
import invitation from "./assets/invitation.jpg";
import gallery1 from "./assets/gallery-1.jpg";
import gallery2 from "./assets/gallery-2.jpg";
import gallery3 from "./assets/gallery-3.jpg";
import gallery4 from "./assets/gallery-4.jpg";
import gallery5 from "./assets/gallery-5.jpg";

const WEDDING_DATE = new Date("2026-11-07T16:00:00+01:00");
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbz_nB-LUpZcXt5pNqERWJudRunIpMm7j7GWe6X6cIqxuLhi7-0njeFvjyhWDh0kz7Db/exec";

const CONFETTI_COLORS = [
  "#bd8b5b",
  "#d8b28b",
  "#e8c7bd",
  "#673333",
  "#f4ece0",
  "#e0b86b",
];

/* Slides elements in when they enter the screen and back out when they leave,
   in both scroll directions. */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 90 }, (_, i) => {
      const round = Math.random() > 0.7;
      const size = 6 + Math.random() * 8;
      return {
        id: i,
        left: Math.random() * 100,
        width: size,
        height: round ? size : size * 1.6,
        round,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 1.6,
        duration: 3 + Math.random() * 2.5,
        drift: (Math.random() - 0.5) * 240,
        spin: 360 + Math.random() * 720,
      };
    })
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            "--delay": `${p.delay}s`,
            "--dur": `${p.duration}s`,
            "--drift": `${p.drift}px`,
            "--spin": `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}

function RsvpModal({ name, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-badge">
          <Check size={40} strokeWidth={3} />
        </div>

        <h3 id="rsvp-title">Congratulations{name ? `, ${name}` : ""}!</h3>
        <p>
          Your attendance is confirmed and your seat is secured. We are so happy
          you will be celebrating with us.
        </p>

        <div className="modal-details">
          <strong>Saturday, November 7, 2026 · 4:00 PM</strong>
          <span>Bay Water Park, Lekki Phase 1, Lagos</span>
        </div>

        <p className="modal-hashtag">#DanielGotJoy</p>

        <button className="primary-button modal-button" onClick={onClose}>
          <AlertTriangle size={16} /> DO NOT SHARE THIS LINK.
        </button>
      </div>
      <Confetti />
    </div>
  );
}

function WishSentModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="modal-badge">
          <Heart size={36} strokeWidth={2.4} />
        </div>
        <h3>Wish sent!</h3>
        <p>Thank you for your kind words. Joy & Daniel will treasure them.</p>
        <button className="primary-button modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function Countdown() {
  const getTimeLeft = () => {
    const difference = WEDDING_DATE.getTime() - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {units.map(([label, value], i) => (
        <div
          className={`countdown-card reveal reveal-zoom delay-${i + 1}`}
          key={label}
        >
          <span className="countdown-value">
            {String(value).padStart(2, "0")}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function timeAgo(dateStr) {
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function WishesSection() {
  const [wishes, setWishes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [wishStatus, setWishStatus] = useState("idle");
  const [showWishModal, setShowWishModal] = useState(false);

  useEffect(() => {
    fetch(`${SHEET_URL}?action=wishes`)
      .then((res) => res.json())
      .then((data) => setWishes(data.wishes || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const handleWish = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const optimisticWish = {
      name: data.get("name"),
      relationship: data.get("relationship"),
      message: data.get("message"),
      timestamp: new Date().toISOString(),
    };

    setWishStatus("sending");
    try {
      const params = new URLSearchParams(data);
      params.set("type", "wish");
      await fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: params });
      setWishes((prev) => [optimisticWish, ...prev]);
      setWishStatus("done");
      setShowWishModal(true);
      form.reset();
      setTimeout(() => setWishStatus("idle"), 2500);
    } catch {
      setWishStatus("error");
    }
  };

  return (
    <section className="wishes-section">
      <div className="container narrow">
        <div className="section-kicker reveal">
          <Sparkles size={15} /> FROM THE HEART
        </div>
        <h2 className="reveal delay-1">
          Well <em>Wishes</em>
        </h2>
        <p className="section-copy reveal delay-2">
          Leave a message of love and celebration for the couple. Your words
          will be treasured forever.
        </p>

        <div className="wishes-board reveal delay-3">
          {!loaded ? (
            <p className="wishes-empty">Loading wishes…</p>
          ) : wishes.length === 0 ? (
            <p className="wishes-empty">
              Be the first to leave a wish <Sparkles size={14} />
            </p>
          ) : (
            <div className="wishes-list">
              {wishes.map((w, i) => (
                <div className="wish-card" key={i}>
                  <div className="wish-card-top">
                    <strong>{w.name}</strong>
                    {w.relationship && <span>{w.relationship}</span>}
                  </div>
                  <p>{w.message}</p>
                  {w.timestamp && <time>{timeAgo(w.timestamp)}</time>}
                </div>
              ))}
            </div>
          )}
        </div>

        <form className="wish-form reveal delay-2" onSubmit={handleWish}>
          <p className="hidden-field">
            <label>
              Leave empty:{" "}
              <input name="botField" tabIndex="-1" autoComplete="off" />
            </label>
          </p>

          <div className="section-kicker light">LEAVE A MESSAGE</div>
          <h3>
            Send Your <em>Wishes</em>
          </h3>

          <label>
            <span>YOUR NAME</span>
            <input type="text" name="name" placeholder="Amaka Osei" required />
          </label>

          <label>
            <span>RELATIONSHIP TO COUPLE</span>
            <input
              type="text"
              name="relationship"
              placeholder="e.g. College friend, Cousin…"
            />
          </label>

          <label>
            <span>YOUR MESSAGE</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Write your heartfelt message to Joy & Daniel…"
              required
            />
          </label>

          <button
            className="confirm-button wish-button"
            type="submit"
            disabled={wishStatus === "sending"}
          >
            {wishStatus === "sending" ? (
              "SENDING…"
            ) : wishStatus === "done" ? (
              "WISH SENT ✓"
            ) : (
              <>
                SEND MY WISHES <Send size={15} />
              </>
            )}
          </button>

          {wishStatus === "error" && (
            <p className="form-error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
        {showWishModal && (
          <WishSentModal onClose={() => setShowWishModal(false)} />
        )}
      </div>
    </section>
  );
}

const GALLERY_IMAGES = [gallery1, gallery2, gallery3, gallery4, gallery5];

function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (activeImage === null) return;
    const onKey = (e) => e.key === "Escape" && setActiveImage(null);
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImage]);

  return (
    <section className="gallery-section">
      <div className="container narrow">
        <div className="section-kicker reveal">
          <Heart size={15} /> TOGETHER
        </div>
        <h2 className="reveal delay-1">Moments we love.</h2>
        <p className="section-copy reveal delay-2">
          A few of our favourite memories together.
        </p>
      </div>

      <div className="gallery-grid container">
        {GALLERY_IMAGES.map((src, i) => (
          <button
            key={i}
            className={`gallery-item reveal reveal-zoom delay-${(i % 5) + 1}`}
            onClick={() => setActiveImage(src)}
            aria-label="View photo"
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {activeImage && (
        <div className="lightbox-overlay" onClick={() => setActiveImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setActiveImage(null)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={activeImage}
            alt=""
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function App() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [showModal, setShowModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("email"); // "email" | "phone"

  useScrollReveal();

  const handleRsvp = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const firstName = new FormData(form).get("firstName");
    setStatus("sending");
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(new FormData(form)),
      });
      setGuestName(String(firstName || "").trim());
      setStatus("done");
      setShowModal(true);
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const scrollToDetails = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        {/* <nav className="nav container">
          <a href="#top" className="brand">
            <img src={logo} alt="Joy & Daniel logo" />
            <span>JOY & DANIEL</span>
          </a>
          <a className="nav-link" href="#details">
            Invitation
          </a>
        </nav> */}

        <div className="hero-content container">
          <div className="eyebrow reveal">A BEAUTIFUL BEGINNING</div>
          <div className="logo-wrap reveal reveal-zoom delay-1">
            <img src={logo} alt="Joy and Daniel" className="hero-logo" />
          </div>

          <p className="invitation-line reveal delay-2">
            With joyful hearts, we invite you to celebrate the
            <strong> solemnization of the marriage of</strong>
          </p>

          <h1 className="couple-name reveal delay-3">
            <span>Joy</span>
            <small>&amp;</small>
            <span>Daniel</span>
          </h1>

          <div className="date-block reveal delay-4">
            <div>
              <span className="date-month">NOV</span>
              <strong>07</strong>
              <span className="date-year">2026</span>
            </div>
            <span className="date-divider" />
            <div>
              <span className="date-month">TIME</span>
              <strong>4PM</strong>
              <span className="date-year">LAGOS</span>
            </div>
          </div>

          <div className="reveal delay-5">
            <button className="scroll-button" onClick={scrollToDetails}>
              Explore our invitation <ArrowDown size={17} />
            </button>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="container narrow">
          <div className="section-kicker reveal">
            <Sparkles size={15} /> COUNTING DOWN TO JOY
          </div>
          <h2 className="reveal delay-1">Our day is almost here.</h2>
          <p className="section-copy reveal delay-2">
            Save the date and join us as we celebrate a beautiful new chapter.
          </p>
          <Countdown />
        </div>
      </section>

      <section id="details" className="details-section">
        <div className="container details-grid">
          <div className="details-copy">
            <div className="section-kicker reveal reveal-left">
              <Heart size={15} /> THE INVITATION
            </div>
            <h2 className="reveal reveal-left delay-1">
              Two families.
              <br />
              One beautiful celebration.
            </h2>
            <p className="reveal reveal-left delay-2">
              The families of{" "}
              <strong>Late Mr Ebon Echi &amp; Mrs Grace Abeng Igbara</strong>{" "}
              and <strong>Late Mr Lawrence Obi &amp; Mrs Joan Udo Okobi</strong>{" "}
              invite you to share in this special day.
            </p>

            <div className="event-info">
              <div className="info-row reveal reveal-left delay-2">
                <span className="info-icon">
                  <CalendarDays size={20} />
                </span>
                <div>
                  <small>DATE</small>
                  <strong>Saturday, November 7, 2026</strong>
                </div>
              </div>
              <div className="info-row reveal reveal-left delay-3">
                <span className="info-icon">
                  <Clock3 size={20} />
                </span>
                <div>
                  <small>TIME</small>
                  <strong>4:00 PM</strong>
                </div>
              </div>
              <div className="info-row reveal reveal-left delay-4">
                <span className="info-icon">
                  <MapPin size={20} />
                </span>
                <div>
                  <small>VENUE</small>
                  <strong>Bay Water Park</strong>
                  <span>
                    8B Wole Olateju Crescent, Lekki Phase 1, Lagos, Nigeria
                  </span>
                </div>
              </div>
            </div>

            <div className="actions reveal reveal-left delay-5">
              <a
                className="primary-button"
                href="https://www.google.com/maps/search/?api=1&query=Bay+Water+Park+8B+Wole+Olateju+Crescent+Lekki+Phase+1+Lagos"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={17} /> Get directions
              </a>
              {/* <a
                className="secondary-button"
                href="https://wa.me/2348067717236?text=Hello%20Emmanuel%2C%20I%27d%20like%20to%20RSVP%20for%20Joy%20%26%20Daniel%27s%20wedding."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} /> RSVP
              </a> */}
            </div>
          </div>

          <div className="invitation-card reveal reveal-right delay-2">
            <div className="card-frame">
              <div className="qr-card">
                <span className="qr-icon">
                  <Ticket size={22} />
                </span>

                <div className="qr-eyebrow">ENTRY</div>
                <h3 className="qr-title">
                  <QrCode size={26} /> QR Code Required
                </h3>
                <p className="qr-copy">
                  Your personal QR code will be sent to you before the event.
                  Please have it ready for scanning at the entrance.
                </p>
              </div>
            </div>

            <div className="caution-banner">
              <AlertTriangle size={18} color="red" />
              <p>Kindly note that this is an adults-only celebration.</p>
              <AlertTriangle size={18} color="red" />
            </div>
          </div>
        </div>
      </section>

      <section className="palette-section">
        <div className="container narrow">
          <div className="section-kicker reveal">
            <Sparkles size={15} /> DRESS CODE
          </div>
          <h2 className="reveal delay-1">
            Pastel. Soft neutrals.
            <br />
            Warm earth tones.
          </h2>
          <div className="swatches reveal reveal-zoom delay-2">
            <span className="swatch cream" />
            <span className="swatch blush" />
            <span className="swatch taupe" />
            <span className="swatch brown" />
            <span className="swatch gold" />
          </div>
          <p className="hashtag reveal delay-3">#DanielGotJoy</p>
        </div>
      </section>
      <section className="love-story">
        <div className="container narrow">
          <div className="section-kicker reveal">
            <Heart size={15} /> OUR STORY
          </div>
          <h2 className="reveal delay-1">How it all began.</h2>

          <div className="story-quote reveal delay-2">
            <Quote size={28} />
          </div>

          <div className="story-body reveal delay-2">
            <p>
              Our love story began the sweetest way, with a little nudge from
              friends who somehow knew before we did. Honestly, I wasn't sold on
              the idea at first 🤷🏼‍♀️… introductions were never really my thing.
              But fate had other plans. Numbers were exchanged, Daniel sent that
              first message, and without either of us realizing it, our hearts
              had quietly started finding their way home.
            </p>

            <p>
              One conversation turned into many. Many turned into late nights,
              endless laughter, shared secrets, and the kind of comfort that
              makes the whole world feel softer. Somewhere between the sweet
              messages and the stolen moments, he became my favourite person, my
              safe place, and the smile I didn't know I'd been waiting for. What
              started with a little hesitation blossomed into a love so warm, so
              easy, and so completely ours🥰.
            </p>

            <p>
              Then, this June, my love asked me the most beautiful question of
              my life, and in that moment, every laugh, every memory, and every
              "good morning" text became the first page of our forever.
            </p>
          </div>

          <div className="story-highlight reveal reveal-zoom delay-3">
            <Heart size={22} />
            <p>And of course, with my whole heart, I said yes!</p>
          </div>

          <p className="story-close reveal delay-2">
            Now, we can't wait to celebrate this magical new chapter surrounded
            by the people we love most, as we step hand in hand into our happily
            ever after.
          </p>
        </div>
      </section>

      <GallerySection />

      <section className="rsvp-section">
        <div className="container rsvp-container">
          <div className="rsvp-heading reveal reveal-left">
            <div className="section-kicker light">
              WE WOULD LOVE TO HAVE YOU
            </div>
            <h2>Confirm your attendance.</h2>
            <p>
              Please confirm your attendance by filling in the form below. Your
              unique QR code will be sent to you by Email or Whatsapp after
              attendance is confirmed.
            </p>

            <div className="how-it-works">
              <span className="how-it-works-icon">
                <Ticket size={16} />
              </span>
              <p>
                <strong>How it works:</strong> Expect the QR code to be sent to
                your <strong>Email</strong> or <strong>Whatsapp</strong> before
                the event. Present it at the venue entrance on the day.
              </p>
            </div>

            <div className="rsvp-caution">
              <AlertTriangle size={16} />
              <p>
                <strong>Please note:</strong> This invitation is personal and
                non-transferable. Please do not share your invitation link.
              </p>
            </div>
          </div>

          <form
            className="rsvp-form reveal reveal-right delay-2"
            onSubmit={handleRsvp}
          >
            <p className="hidden-field">
              <label>
                Leave empty:{" "}
                <input name="botField" tabIndex="-1" autoComplete="off" />
              </label>
            </p>

            <div className="form-row">
              <label>
                <span>FIRST NAME</span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  required
                />
              </label>
              <label>
                <span>LAST NAME</span>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </label>
            </div>

            <div className="delivery-choice">
              <span className="delivery-label">SEND MY QR CODE VIA</span>
              <div className="delivery-toggle">
                <button
                  type="button"
                  className={deliveryMethod === "email" ? "active" : ""}
                  onClick={() => setDeliveryMethod("email")}
                >
                  Email
                </button>
                <button
                  type="button"
                  className={deliveryMethod === "phone" ? "active" : ""}
                  onClick={() => setDeliveryMethod("phone")}
                >
                  Phone (WhatsApp)
                </button>
              </div>
            </div>

            {deliveryMethod === "email" ? (
              <label>
                <span>EMAIL ADDRESS</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            ) : (
              <label>
                <span>PHONE NUMBER</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+234 801 234 5678"
                  required
                />
              </label>
            )}

            <button
              className="confirm-button"
              type="submit"
              disabled={status === "sending" || status === "done"}
            >
              {status === "done" ? (
                "ATTENDANCE CONFIRMED ✓"
              ) : status === "sending" ? (
                "SENDING…"
              ) : (
                <>
                  CONFIRM ATTENDANCE <span>→</span>
                </>
              )}
            </button>

            {status === "error" && (
              <p className="form-error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      <WishesSection />
      <footer className="reveal">
        <img src={logo} alt="" />
        <span>JOY &amp; DANIEL · NOVEMBER 7, 2026</span>
        <span>#DanielGotJoy</span>
      </footer>

      {showModal && (
        <RsvpModal name={guestName} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
