import { useState } from "react";

const SERVICES = [
  { name: "Classic haircut", price: "$28", note: "Scissor or clipper, your call" },
  { name: "Haircut + beard combo", price: "$40", note: "The full sit-down" },
  { name: "Hot towel straight razor shave", price: "$35", note: "Lather, blade, and a hot towel finish" },
  { name: "Beard trim & line-up", price: "$18", note: "Shape it back up" },
  { name: "Buzz cut", price: "$20", note: "In and out, sharp and simple" },
  { name: "Kids cut, 12 and under", price: "$22", note: "First haircuts welcome" },
  { name: "Senior cut, 65+", price: "$24", note: "Every Tuesday and Wednesday" },
];

const VIP_PACKAGES = [
  { name: "Weddings", note: "Groomsmen packages so the whole party looks sharp for photos" },
  { name: "Corporate", note: "Reward your team or top performers with a private session" },
  { name: "Private sessions", note: "Skip the wait, escape the crowd, food and drink arranged on request" },
];

const HOURS = [
  ["Monday", "Closed"],
  ["Tuesday", "9:00 AM – 6:00 PM"],
  ["Wednesday", "9:00 AM – 6:00 PM"],
  ["Thursday", "9:00 AM – 6:00 PM"],
  ["Friday", "9:00 AM – 6:00 PM"],
  ["Saturday", "9:00 AM – 4:00 PM"],
  ["Sunday", "Closed"],
];

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

function BarberPole({ size = 40 }) {
  return (
    <div
      className="barber-pole"
      style={{ width: size, height: size * 2.6 }}
      aria-hidden="true"
    >
      <div className="barber-pole-cap barber-pole-cap-top" />
      <div className="barber-pole-stripes" />
      <div className="barber-pole-cap barber-pole-cap-bottom" />
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0].name,
    date: "",
    time: TIMES[0],
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name";
    if (!form.phone.trim()) nextErrors.phone = "Enter a phone number";
    if (!form.date) nextErrors.date = "Pick a date";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="shop">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bevan&family=Vollkorn:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        .shop {
          --ink: #2c1c14;
          --parchment: #f1e6cd;
          --parchment-deep: #e7d7b3;
          --walnut: #241713;
          --walnut-light: #3a271f;
          --brass: #b0863f;
          --brass-light: #d4b478;
          --red: #7e2a2f;
          --green: #2c4433;
          --cream-text: #f1e6cd;
          font-family: 'Vollkorn', Georgia, serif;
          color: var(--ink);
          background: var(--parchment);
          line-height: 1.6;
        }
        .shop * { box-sizing: border-box; }
        .shop h1, .shop h2, .shop h3, .shop .display {
          font-family: 'Bevan', Georgia, serif;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .shop a { color: inherit; }
        .shop .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

        /* --- Barber pole signature element --- */
        .barber-pole { position: relative; border-radius: 999px; overflow: hidden; box-shadow: inset 0 0 0 2px rgba(0,0,0,0.25); }
        .barber-pole-cap { height: 10%; background: var(--brass-light); }
        .barber-pole-stripes {
          height: 80%;
          background: repeating-linear-gradient(
            45deg,
            #c0393f 0 14px,
            #f1e6cd 14px 28px,
            #2c4433 28px 42px,
            #f1e6cd 42px 56px
          );
          background-size: 200% 200%;
          animation: pole-spin 2.2s linear infinite;
        }
        @keyframes pole-spin { from { background-position: 0 0; } to { background-position: 0 56px; } }
        @media (prefers-reduced-motion: reduce) { .barber-pole-stripes { animation: none; } }

        /* --- Nav --- */
        .nav {
          position: sticky; top: 0; z-index: 20;
          background: var(--walnut);
          color: var(--cream-text);
          border-bottom: 3px solid var(--brass);
        }
        .nav-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; }
        .nav-brand { display: flex; align-items: center; gap: 12px; }
        .nav-brand-text { font-family: 'Bevan', Georgia, serif; font-size: 20px; line-height: 1.1; }
        .nav-brand-text span { display: block; font-family: 'Vollkorn', Georgia, serif; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--brass-light); }
        .nav-links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
        .nav-links a { text-decoration: none; font-size: 15px; letter-spacing: 0.03em; text-transform: uppercase; color: var(--cream-text); border-bottom: 2px solid transparent; padding-bottom: 3px; transition: border-color 0.15s ease; }
        .nav-links a:hover { border-color: var(--brass); }
        .nav-toggle { display: none; background: none; border: 1px solid var(--brass); color: var(--cream-text); padding: 6px 10px; font-size: 14px; border-radius: 4px; }
        .nav-mobile { display: none; flex-direction: column; gap: 0; border-top: 1px solid var(--walnut-light); }
        .nav-mobile a { color: var(--cream-text); text-decoration: none; padding: 12px 24px; border-bottom: 1px solid var(--walnut-light); font-size: 15px; }
        @media (max-width: 760px) {
          .nav-links { display: none; }
          .nav-toggle { display: inline-block; }
          .nav-mobile.open { display: flex; }
        }

        /* --- Hero --- */
        .hero { background: var(--walnut); color: var(--cream-text); padding: 72px 24px 88px; position: relative; overflow: hidden; }
        .hero-inner { max-width: 1080px; margin: 0 auto; display: flex; align-items: center; gap: 48px; }
        .hero-copy { flex: 1; min-width: 280px; }
        .hero-eyebrow { color: var(--brass-light); text-transform: uppercase; letter-spacing: 0.22em; font-size: 13px; margin: 0 0 14px; }
        .hero h1 { font-size: clamp(36px, 5.4vw, 58px); margin: 0 0 18px; line-height: 1.08; }
        .hero h1 em { font-style: normal; color: var(--brass-light); }
        .hero p.lede { font-size: 18px; max-width: 46ch; color: #e6d9bc; margin: 0 0 30px; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn { display: inline-block; padding: 13px 26px; font-family: 'Bevan', Georgia, serif; font-size: 15px; text-decoration: none; border-radius: 3px; border: 2px solid transparent; cursor: pointer; transition: transform 0.12s ease; }
        .btn:active { transform: scale(0.97); }
        .btn-brass { background: var(--brass); color: var(--walnut); border-color: var(--brass); }
        .btn-outline { background: transparent; color: var(--cream-text); border-color: var(--brass-light); }
        .hero-pole-wrap { display: flex; align-items: center; justify-content: center; gap: 24px; }
        @media (max-width: 760px) { .hero-inner { flex-direction: column; text-align: center; } .hero-actions { justify-content: center; } }

        /* --- Rating strip --- */
        .rating-strip { background: var(--brass); color: var(--walnut); text-align: center; padding: 12px 24px; font-size: 14px; letter-spacing: 0.04em; }
        .rating-strip strong { font-family: 'Bevan', Georgia, serif; }

        /* --- Section shell --- */
        .section { padding: 72px 24px; }
        .section-alt { background: var(--parchment-deep); }
        .section-head { text-align: center; margin-bottom: 44px; }
        .section-head .kicker { text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; color: var(--red); margin: 0 0 8px; }
        .section-head h2 { font-size: clamp(28px, 4vw, 38px); margin: 0; }
        .divider { width: 64px; height: 4px; background: var(--brass); margin: 18px auto 0; border-radius: 2px; }

        /* --- About --- */
        .about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
        .about-text p { font-size: 16.5px; margin: 0 0 16px; }
        .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
        .stat { border: 1px solid var(--brass); border-radius: 6px; padding: 16px 12px; text-align: center; background: var(--parchment); }
        .stat b { display: block; font-family: 'Bevan', Georgia, serif; font-size: 24px; color: var(--red); }
        .stat span { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); opacity: 0.75; }
        .about-card { background: var(--walnut); color: var(--cream-text); border-radius: 10px; padding: 32px; }
        .about-card h3 { margin: 0 0 12px; font-size: 20px; color: var(--brass-light); }
        .about-card ul { margin: 0; padding-left: 20px; }
        .about-card li { margin-bottom: 8px; }
        @media (max-width: 800px) { .about-grid { grid-template-columns: 1fr; } }

        /* --- Services / menu board --- */
        .menu-board { background: var(--walnut); color: var(--cream-text); border-radius: 12px; padding: 8px 8px 24px; box-shadow: 0 0 0 6px var(--brass); }
        .menu-board-inner { padding: 32px 28px 8px; }
        .menu-list { list-style: none; margin: 0; padding: 0; }
        .menu-row { display: flex; align-items: baseline; gap: 12px; padding: 16px 0; border-bottom: 1px dashed rgba(241,230,205,0.25); }
        .menu-row:last-child { border-bottom: none; }
        .menu-row .name { font-family: 'Bevan', Georgia, serif; font-size: 18px; white-space: nowrap; }
        .menu-row .fill { flex: 1; border-bottom: 2px dotted rgba(241,230,205,0.35); transform: translateY(-5px); }
        .menu-row .price { font-family: 'Bevan', Georgia, serif; font-size: 18px; color: var(--brass-light); white-space: nowrap; }
        .menu-row .note { display: block; font-size: 13px; color: #cbb98f; margin-top: 2px; }

        /* --- Booking --- */
        .booking-shell { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .booking-form { background: var(--parchment); border: 1px solid var(--brass); border-radius: 10px; padding: 32px; }
        .field { margin-bottom: 18px; }
        .field label { display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; color: var(--walnut-light); }
        .field input, .field select, .field textarea {
          width: 100%; font-family: 'Vollkorn', Georgia, serif; font-size: 15px;
          padding: 10px 12px; border: 1px solid #b8a67c; border-radius: 5px;
          background: #fffdf7; color: var(--ink);
        }
        .field input:focus, .field select:focus, .field textarea:focus {
          outline: none; border-color: var(--red); box-shadow: 0 0 0 3px rgba(126,42,47,0.15);
        }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-error { color: var(--red); font-size: 12.5px; margin-top: 4px; }
        .booking-note { font-size: 14px; color: var(--walnut-light); background: #fff9ea; border: 1px solid var(--brass-light); border-radius: 8px; padding: 14px 16px; margin-top: 16px; }
        .success-box { background: var(--green); color: var(--cream-text); border-radius: 10px; padding: 28px; text-align: center; }
        .success-box h3 { margin: 0 0 8px; color: var(--brass-light); }
        @media (max-width: 800px) { .booking-shell { grid-template-columns: 1fr; } .field-row { grid-template-columns: 1fr; } }

        .hours-card { border: 1px solid var(--brass); border-radius: 10px; overflow: hidden; }
        .hours-card table { width: 100%; border-collapse: collapse; }
        .hours-card td { padding: 10px 18px; font-size: 15px; border-bottom: 1px solid var(--parchment-deep); }
        .hours-card tr:last-child td { border-bottom: none; }
        .hours-card td:last-child { text-align: right; color: var(--red); font-weight: 700; }
        .hours-card tr.closed td:last-child { color: var(--walnut-light); opacity: 0.6; font-weight: 400; }
        .hours-card-head { background: var(--walnut); color: var(--brass-light); padding: 14px 18px; font-family: 'Bevan', Georgia, serif; }

        /* --- VIP --- */
        .vip-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .vip-card { background: var(--parchment); border: 1px solid var(--brass); border-radius: 10px; padding: 24px; text-align: center; }
        .vip-card h3 { margin: 0 0 8px; font-size: 17px; color: var(--red); }
        .vip-card p { font-size: 14px; margin: 0; color: var(--walnut-light); }
        .vip-note { text-align: center; margin-top: 28px; font-size: 15px; color: var(--walnut-light); }
        @media (max-width: 760px) { .vip-grid { grid-template-columns: 1fr; } }

        /* --- Social --- */
        .social-row { display: flex; gap: 12px; margin-top: 14px; }
        .social-row a { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border: 1px solid var(--brass-light); border-radius: 50%; color: var(--brass-light); text-decoration: none; font-size: 13px; }
        .social-row a:hover { background: var(--brass-light); color: var(--walnut); }

        /* --- Info banner --- */
        .info-banner { background: var(--parchment-deep); border-bottom: 2px solid var(--brass); padding: 18px 24px; text-align: center; }
        .info-banner-inner { max-width: 1080px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; }
        .info-banner-text { font-size: 15px; line-height: 1.5; }
        .info-banner-text strong { font-family: 'Bevan', Georgia, serif; font-weight: 400; display: block; font-size: 16px; margin-bottom: 2px; }
        .info-banner-text em { font-style: normal; color: var(--red); }
        .info-banner-hours { font-size: 13.5px; color: var(--walnut-light); }

        /* --- Payment badges --- */
        .pay-strip { text-align: center; margin-top: 18px; }
        .pay-strip .pay-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--brass-light); margin-bottom: 10px; }
        .pay-badges { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .pay-badge { border: 1px solid var(--brass-light); border-radius: 5px; padding: 6px 12px; font-size: 13px; font-family: 'Bevan', Georgia, serif; color: var(--brass-light); }

        /* --- Map --- */
        .map-shell { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; align-items: stretch; }
        .map-frame { border: 3px solid var(--brass); border-radius: 10px; overflow: hidden; min-height: 320px; }
        .map-frame iframe { width: 100%; height: 100%; min-height: 320px; border: 0; display: block; }
        .map-info { background: var(--walnut); color: var(--cream-text); border-radius: 10px; padding: 28px; display: flex; flex-direction: column; justify-content: center; gap: 14px; }
        .map-info h3 { margin: 0; color: var(--brass-light); font-size: 19px; }
        .map-info p { margin: 0; font-size: 15px; color: #e6d9bc; }
        @media (max-width: 800px) { .map-shell { grid-template-columns: 1fr; } }

        /* --- Contact / footer --- */
        .footer { background: var(--walnut); color: var(--cream-text); padding: 56px 24px 28px; }
        .footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 40px; }
        .footer h3 { font-size: 17px; color: var(--brass-light); margin: 0 0 14px; }
        .footer p, .footer li { font-size: 14.5px; color: #d8c9a3; }
        .footer ul { list-style: none; margin: 0; padding: 0; }
        .footer li { margin-bottom: 8px; }
        .footer-bottom { max-width: 1080px; margin: 40px auto 0; padding-top: 20px; border-top: 1px solid var(--walnut-light); font-size: 13px; color: #a5936a; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .footer a.link { color: var(--brass-light); text-decoration: none; }
        .footer a.link:hover { text-decoration: underline; }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-row">
          <div className="nav-brand">
            <BarberPole size={22} />
            <div className="nav-brand-text">
              Ol&rsquo; Time
              <span>Barber Shop</span>
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#about" onClick={scrollTo("about")}>About</a></li>
            <li><a href="#services" onClick={scrollTo("services")}>Services</a></li>
            <li><a href="#vip" onClick={scrollTo("vip")}>VIP</a></li>
            <li><a href="#booking" onClick={scrollTo("booking")}>Book</a></li>
            <li><a href="#map" onClick={scrollTo("map")}>Find us</a></li>
            <li><a href="#contact" onClick={scrollTo("contact")}>Contact</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setNavOpen((o) => !o)} aria-label="Toggle menu">
            {navOpen ? "Close" : "Menu"}
          </button>
        </div>
        <div className={`nav-mobile ${navOpen ? "open" : ""}`}>
          <a href="#about" onClick={scrollTo("about")}>About</a>
          <a href="#services" onClick={scrollTo("services")}>Services</a>
          <a href="#vip" onClick={scrollTo("vip")}>VIP</a>
          <a href="#booking" onClick={scrollTo("booking")}>Book</a>
          <a href="#map" onClick={scrollTo("map")}>Find us</a>
          <a href="#contact" onClick={scrollTo("contact")}>Contact</a>
        </div>
      </nav>

      {/* INFO BANNER */}
      <div className="info-banner">
        <div className="info-banner-inner">
          <div className="info-banner-text">
            <strong>6721 Bells Ferry Rd. Ste. D122, Woodstock, GA 30189</strong>
            (770) 648-4805 &middot; Next to Goodwill &middot; <em>Se Habla Espa&ntilde;ol</em>
          </div>
          <a
            className="btn btn-brass"
            href="#booking"
            onClick={scrollTo("booking")}
          >
            Book now
          </a>
          <div className="info-banner-hours">
            Tues. &ndash; Fri. 9am&ndash;6pm<br />Sat. 9am&ndash;4pm
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">Woodstock, Georgia &middot; Next to Goodwill &middot; Se habla espa&ntilde;ol</p>
            <h1>A <em>proper</em> cut,<br />the old way</h1>
            <p className="lede">
              Straight razors, hot towels, and barbers who remember your name. Ol&rsquo; Time Barber Shop has
              been Cherokee County&rsquo;s neighborhood barbershop for families, first haircuts, and regulars alike.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="btn btn-brass" onClick={scrollTo("booking")}>Book a chair</a>
              <a href="#services" className="btn btn-outline" onClick={scrollTo("services")}>See the menu</a>
            </div>
          </div>
          <div className="hero-pole-wrap">
            <BarberPole size={56} />
          </div>
        </div>
      </header>

      <div className="rating-strip">
        <strong>4.8 / 5</strong> stars from 278 regulars &middot; 6721 Bells Ferry Rd, Woodstock, GA
      </div>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">The shop</p>
            <h2>Old-school skill, new regulars every week</h2>
            <div className="divider" />
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Walk in and you&rsquo;ll hear clippers buzzing, good music, and barbers who actually talk to you.
                Ruben, Rich, and the team have been cutting hair in Cherokee County for years, and it shows &mdash;
                every cut is clean, consistent, and done with real craft.
              </p>
              <p>
                We cut every hair type, every age, every style. Bring your kid in for their first haircut or
                come in for your weekly line-up &mdash; either way, you&rsquo;ll leave looking sharp and feeling
                like part of the family.
              </p>
              <div className="about-stats">
                <div className="stat"><b>4.8</b><span>Google rating</span></div>
                <div className="stat"><b>278</b><span>Reviews</span></div>
                <div className="stat"><b>6</b><span>Days a week</span></div>
              </div>
            </div>
            <div className="about-card">
              <h3>Why regulars keep coming back</h3>
              <ul>
                <li>Straight razor hot towel shaves done right</li>
                <li>Barbers who know your usual by heart</li>
                <li>Clean, classic shop with an easy walk-in feel</li>
                <li>Kids, seniors, and every hair type welcome</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-alt" id="services">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">On the board</p>
            <h2>Services & prices</h2>
            <div className="divider" />
          </div>
          <div className="menu-board">
            <div className="menu-board-inner">
              <ul className="menu-list">
                {SERVICES.map((s) => (
                  <li className="menu-row" key={s.name}>
                    <span className="name">
                      {s.name}
                      <span className="note">{s.note}</span>
                    </span>
                    <span className="fill" />
                    <span className="price">{s.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VIP */}
      <section className="section section-alt" id="vip">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Beyond the chair</p>
            <h2>VIP services</h2>
            <div className="divider" />
          </div>
          <div className="vip-grid">
            {VIP_PACKAGES.map((v) => (
              <div className="vip-card" key={v.name}>
                <h3>{v.name}</h3>
                <p>{v.note}</p>
              </div>
            ))}
          </div>
          <p className="vip-note">
            Skip the wait and book a private, top-notch master barber session &mdash; reach out below for pricing.
          </p>
        </div>
      </section>

      {/* BOOKING */}
      <section className="section" id="booking">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Grab a chair</p>
            <h2>Book your appointment</h2>
            <div className="divider" />
          </div>
          <div className="booking-shell">
            {submitted ? (
              <div className="success-box">
                <h3>You&rsquo;re on the books</h3>
                <p>
                  Thanks, {form.name.split(" ")[0] || "friend"}. We&rsquo;ve got you down for {form.service.toLowerCase()} on {form.date} at {form.time}.
                  We&rsquo;ll call {form.phone} to confirm.
                </p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit} noValidate>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input id="name" type="text" value={form.name} onChange={update("name")} placeholder="Jane Smith" />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="(770) 555-0110" />
                    {errors.phone && <div className="field-error">{errors.phone}</div>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="email">Email (optional)</label>
                  <input id="email" type="email" value={form.email} onChange={update("email")} placeholder="jane@email.com" />
                </div>
                <div className="field">
                  <label htmlFor="service">Service</label>
                  <select id="service" value={form.service} onChange={update("service")}>
                    {SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>{s.name} &mdash; {s.price}</option>
                    ))}
                  </select>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" value={form.date} onChange={update("date")} />
                    {errors.date && <div className="field-error">{errors.date}</div>}
                  </div>
                  <div className="field">
                    <label htmlFor="time">Time</label>
                    <select id="time" value={form.time} onChange={update("time")}>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="notes">Notes (optional)</label>
                  <textarea id="notes" rows={3} value={form.notes} onChange={update("notes")} placeholder="Ask for a specific barber, first haircut, etc." />
                </div>
                <button type="submit" className="btn btn-brass" style={{ width: "100%" }}>Request appointment</button>
                <p className="booking-note">
                  This form holds your request &mdash; we&rsquo;ll call to confirm your chair. For same-day cuts, walk-ins are always welcome too.
                </p>
              </form>
            )}

            <div className="hours-card">
              <div className="hours-card-head">Shop hours</div>
              <table>
                <tbody>
                  {HOURS.map(([day, hrs]) => (
                    <tr key={day} className={hrs === "Closed" ? "closed" : ""}>
                      <td>{day}</td>
                      <td>{hrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section section-alt" id="map">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Find us</p>
            <h2>Come see us in Woodstock</h2>
            <div className="divider" />
          </div>
          <div className="map-shell">
            <div className="map-frame">
              <iframe
                title="Ol' Time Barber Shop location"
                src="https://www.google.com/maps?q=Ol'+Time+Barber+Shop,6721+Bells+Ferry+Rd+D122,Woodstock,GA+30189&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="map-info">
              <h3>6721 Bells Ferry Rd. Ste. D122</h3>
              <p>Woodstock, GA 30189 &middot; Next to Goodwill</p>
              <p>(770) 648-4805</p>
              <p>Tues. &ndash; Fri. 9am&ndash;6pm &middot; Sat. 9am&ndash;4pm</p>
              <a
                className="btn btn-brass"
                href="https://www.google.com/maps/place/Ol'+Time+Barber+Shop/@34.1405376,-84.5884942,17z"
                target="_blank"
                rel="noreferrer"
                style={{ alignSelf: "flex-start" }}
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="footer" id="contact">
        <div className="wrap footer-grid">
          <div>
            <div className="nav-brand" style={{ marginBottom: 14 }}>
              <BarberPole size={20} />
              <div className="nav-brand-text">Ol&rsquo; Time Barber Shop</div>
            </div>
            <p>A classic neighborhood barbershop in Woodstock, GA. Straight razors, honest cuts, no rush.</p>
            <div className="social-row">
              <a href="https://instagram.com/oltimebarbershop/" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href="https://fb.me/oltimebarbershop" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
            </div>
          </div>
          <div>
            <h3>Visit</h3>
            <ul>
              <li>6721 Bells Ferry Rd, Suite D122</li>
              <li>Woodstock, GA 30189 (next to Goodwill)</li>
              <li><a className="link" href="tel:+17706484805">(770) 648-4805</a></li>
            </ul>
            <div className="pay-strip">
              <div className="pay-label">We accept</div>
              <div className="pay-badges">
                <span className="pay-badge">Visa</span>
                <span className="pay-badge">Mastercard</span>
                <span className="pay-badge">Amex</span>
                <span className="pay-badge">Apple Pay</span>
                <span className="pay-badge">Samsung Pay</span>
              </div>
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              <li><a className="link" href="#about" onClick={scrollTo("about")}>About the shop</a></li>
              <li><a className="link" href="#services" onClick={scrollTo("services")}>Services & prices</a></li>
              <li><a className="link" href="#booking" onClick={scrollTo("booking")}>Book an appointment</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Ol&rsquo; Time Barber Shop</span>
          <span>Cherokee County, Georgia</span>
        </div>
      </footer>
    </div>
  );
}
