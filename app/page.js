"use client";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

const benefits = [
  ["01", "Fast", "Move a full night of digicam photos to your phone in seconds."],
  ["02", "Portable", "Small enough to live on your camera, bag, or keys."],
  ["03", "Personal", "Choose your glow and customize the frosted beads."],
];

function SignupForm({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: compact ? "hero" : "final-cta" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setMessage("You’re on the list. Get ready to glow.");
      setEmail("");
      if (window.fbq) window.fbq("track", "Lead");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <form className={`signup-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <label className="sr-only" htmlFor={`email-${compact ? "hero" : "footer"}`}>Email address</label>
      <input
        id={`email-${compact ? "hero" : "footer"}`}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        autoComplete="email"
        required
        disabled={status === "loading" || status === "success"}
      />
      <button disabled={status === "loading" || status === "success"}>
        {status === "loading" ? "Joining…" : status === "success" ? "You’re in" : "Get early access"}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}

function MetaPixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','${id}');fbq('track','PageView');`}
    </Script>
  );
}

export default function Home() {
  return (
    <>
      <MetaPixel />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Glow Gadget home"><span />Glow Gadget</a>
        <nav aria-label="Primary navigation">
          <a href="#how">How it works</a>
          <a href="#colors">Colors</a>
          <a className="nav-cta" href="#signup">Be first</a>
        </nav>
      </header>

      <main>
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="kicker">The camera-to-phone charm</p>
            <h1>Share the night<br />before it ends.</h1>
            <p className="lede">Glow Gadget is a compact SD card reader that turns photo transfer into an accessory—so the pictures leave the camera before everyone goes home.</p>
            <SignupForm compact />
            <p className="microcopy">Early access, launch updates, and first choice of color.</p>
          </div>
          <div className="hero-visual">
            <Image src="/assets/night-out.png" alt="Friends viewing newly shared camera photos on a phone with Glow Gadget connected" fill priority sizes="(max-width: 800px) 100vw, 55vw" />
            <div className="hero-label"><span>12 photos added</span><small>Shared before the night ends</small></div>
          </div>
        </section>

        <section className="statement shell">
          <p>A familiar ritual, without the wait.</p>
          <h2>An SD card reader designed like something you would actually want to carry.</h2>
        </section>

        <section className="product shell">
          <div className="product-image">
            <Image src="/assets/mechanism.png" alt="Glow Gadget with its USB-C cap removed" fill sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="product-copy">
            <p className="kicker">Fashion meets function</p>
            <h2>Small enough to disappear into your look. Distinct enough to become part of it.</h2>
            <p>The polished silver body doubles as a bag or camera charm. Remove the top to reveal USB-C, insert your SD card, and transfer your photos directly to your phone.</p>
            <ul>
              <li>USB-C phone connection</li>
              <li>Full-size SD card reader</li>
              <li>Customizable frosted beads</li>
            </ul>
          </div>
        </section>

        <section className="how shell" id="how">
          <div className="section-heading"><p className="kicker">No laptop. No waiting.</p><h2>Three steps from camera roll to shared album.</h2></div>
          <div className="steps">
            <article>
              <div className="step-number">01</div>
              <div className="step-image"><Image src="/assets/sd-reader.png" alt="SD card being inserted into Glow Gadget" fill sizes="33vw" /></div>
              <h3>Insert the SD card</h3><p>Take the card straight from your digital camera.</p>
            </article>
            <article>
              <div className="step-number">02</div>
              <div className="step-image"><Image src="/assets/plug-in.png" alt="Glow Gadget being connected to a phone" fill sizes="33vw" /></div>
              <h3>Plug into your phone</h3><p>Remove the cap and connect the USB-C end.</p>
            </article>
            <article>
              <div className="step-number">03</div>
              <div className="step-image"><Image src="/assets/night-out.png" alt="Friends sharing photos to a shared album" fill sizes="33vw" /></div>
              <h3>Upload and share</h3><p>Send the photos to a shared album while everyone is still together.</p>
            </article>
          </div>
        </section>

        <section className="benefits">
          <div className="shell benefits-inner">
            <div className="section-heading"><p className="kicker">Why Glow Gadget</p><h2>Practical technology with enough personality to stay visible.</h2></div>
            <div className="benefit-list">
              {benefits.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="colors shell" id="colors">
          <div className="section-heading"><p className="kicker">Choose your glow</p><h2>Three colorways.<br />One polished silver finish.</h2></div>
          <div className="color-image"><Image src="/assets/colorways.png" alt="Glow Gadget in teal, pink, and kiwi" fill sizes="(max-width: 800px) 100vw, 60vw" /></div>
          <div className="swatches"><span className="teal">Teal</span><span className="pink">Pink</span><span className="kiwi">Kiwi</span></div>
        </section>

        <section className="social shell">
          <div className="social-photo"><Image src="/assets/night-out.png" alt="Friends together after transferring photos with Glow Gadget" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <blockquote>“The best photos should not sit on one person’s camera for three weeks.”<cite>Built for digicam nights, group trips, and everyone asking, “When are you sending those?”</cite></blockquote>
        </section>

        <section className="faq shell">
          <div className="section-heading"><p className="kicker">Good to know</p><h2>Questions, answered.</h2></div>
          <div className="faq-list">
            <details><summary>What does Glow Gadget do?</summary><p>It reads the SD card from your digital camera and connects to a USB-C phone so you can import and share photos without a laptop.</p></details>
            <details><summary>Is it also a charm?</summary><p>Yes. It is designed to stay attached to your bag, keys, or camera strap, with removable frosted beads for personalization.</p></details>
            <details><summary>Which phones will it support?</summary><p>The first version is being designed for USB-C phones. Final device and SD-card compatibility will be confirmed before launch.</p></details>
            <details><summary>When does it launch?</summary><p>Join early access to receive development updates, launch timing, and first choice of color.</p></details>
          </div>
        </section>

        <section className="final-cta" id="signup">
          <div className="shell final-inner">
            <p className="kicker">Be first to glow</p>
            <h2>Do not let the night end on someone else’s SD card.</h2>
            <p>Join the early-access list for launch updates, first access to colors, and an introductory offer.</p>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className="shell"><a className="brand" href="#top"><span />Glow Gadget</a><p>Where fashion meets function.</p><p>© 2026 Glow Gadget</p></footer>
    </>
  );
}
