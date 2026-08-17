import { useMemo, useState } from 'react'
import './App.css'

const services = [
  { name: 'Classic Cut', detail: 'Clean clipper or scissor work, finished sharp', price: '$32' },
  { name: 'Straight Razor Shave', detail: 'Hot towel prep, warm lather, steady hand', price: '$38' },
  { name: 'Cut & Beard Trim', detail: 'Shape, line-up, and a polished finish', price: '$46' },
  { name: 'Father & Son', detail: 'Two chairs, one old-school Saturday ritual', price: '$58' },
  { name: 'Hot Towel Cleanup', detail: 'Neck shave, edges, towel, and tonic', price: '$18' },
]

const openDays = [
  ['Tuesday', '9:00 AM - 6:00 PM'],
  ['Wednesday', '9:00 AM - 6:00 PM'],
  ['Thursday', '9:00 AM - 6:00 PM'],
  ['Friday', '9:00 AM - 6:00 PM'],
  ['Saturday', '8:00 AM - 4:00 PM'],
  ['Sunday', 'Closed'],
  ['Monday', 'Closed'],
]

function BarberPole({ label = 'Ol Time stripe' }) {
  return <span className="barber-pole" aria-label={label} />
}

function Nav() {
  return (
    <header className="site-nav">
      <a className="brand" href="#top" aria-label="Ol' Time Barber Shop home">
        <BarberPole label="Animated barber pole mark" />
        <span>Ol' Time Barber Shop</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#booking">Book</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="kicker">Woodstock, GA • Tue-Sat</p>
        <h1>Old-school cuts, straight razor shaves, and a chair that feels like family.</h1>
        <p>
          Ruben, Rich, and the crew keep the hot towels warm, the edges crisp, and the
          welcome easy at Ol' Time Barber Shop.
        </p>
        <a className="button" href="#booking">Book a chair</a>
      </div>
      <div className="hero-pole" aria-hidden="true">
        <BarberPole />
      </div>
    </section>
  )
}

function RatingStrip() {
  return (
    <section className="rating-strip" aria-label="Shop rating">
      <strong>4.8★</strong>
      <span>278 reviews</span>
      <span>Straight razor shaves</span>
      <span>Hot towels</span>
      <span>Part of the family feel</span>
    </section>
  )
}

function About() {
  return (
    <section className="section about-grid" id="about">
      <div>
        <p className="kicker">The Shop</p>
        <h2>Grounded in Woodstock, built on regulars.</h2>
        <p>
          Ol' Time Barber Shop is the kind of place where the rhythm matters: a familiar
          greeting, a towel from the warmer, a careful razor line, and barbers who remember
          how you like it. Ruben and Rich bring the steady-chair confidence people come
          back for.
        </p>
      </div>
      <div className="stats" aria-label="Shop highlights">
        <div>
          <strong>4.8★</strong>
          <span>average rating</span>
        </div>
        <div>
          <strong>278</strong>
          <span>customer reviews</span>
        </div>
        <div>
          <strong>Tue-Sat</strong>
          <span>open weekly</span>
        </div>
      </div>
      <aside className="why-card">
        <h3>Why Regulars Stay</h3>
        <p>
          Straight razor detail, unrushed barbering, warm towels, and the kind of shop talk
          that makes a first visit feel like you have already been coming for years.
        </p>
      </aside>
    </section>
  )
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading">
        <p className="kicker">Menu Board</p>
        <h2>Services</h2>
      </div>
      <div className="menu-board">
        {services.map((service) => (
          <div className="menu-row" key={service.name}>
            <div>
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
            </div>
            <span aria-hidden="true" />
            <strong>{service.price}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: services[0].name,
    date: '',
    time: '',
  })
  const [message, setMessage] = useState('')

  const isReady = useMemo(
    () => form.name.trim() && form.phone.trim() && form.service && form.date && form.time,
    [form],
  )

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setMessage('')
  }

  function submitBooking(event) {
    event.preventDefault()

    if (!isReady) {
      setMessage('Please fill out every field so the shop can confirm your chair.')
      return
    }

    setMessage(`Request received for ${form.service} on ${form.date} at ${form.time}.`)
  }

  return (
    <section className="section booking-section" id="booking">
      <div className="section-heading">
        <p className="kicker">Appointments</p>
        <h2>Book a chair</h2>
      </div>
      <div className="booking-grid">
        <form className="booking-form" onSubmit={submitBooking}>
          <label>
            Name
            <input name="name" value={form.name} onChange={updateField} autoComplete="name" />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" />
          </label>
          <label>
            Service
            <select name="service" value={form.service} onChange={updateField}>
              {services.map((service) => (
                <option key={service.name}>{service.name}</option>
              ))}
            </select>
          </label>
          <div className="form-pair">
            <label>
              Date
              <input name="date" type="date" value={form.date} onChange={updateField} />
            </label>
            <label>
              Time
              <input name="time" type="time" value={form.time} onChange={updateField} />
            </label>
          </div>
          <button className="button" type="submit">Request appointment</button>
          <p className="form-message" role="status">{message}</p>
        </form>
        <div className="hours-panel">
          <h3>Hours</h3>
          <table>
            <tbody>
              {openDays.map(([day, hours]) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  <td>{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div>
        <div className="footer-brand">
          <BarberPole label="Animated barber pole footer mark" />
          <h2>Ol' Time Barber Shop</h2>
        </div>
        <p>6721 Bells Ferry Rd. Ste. D122, Woodstock, GA 30189</p>
      </div>
      <address>
        <a href="tel:+17706484805">(770) 648-4805</a>
        <span>Open Tuesday-Saturday</span>
        <span>Hot towels, razor shaves, classic cuts</span>
      </address>
    </footer>
  )
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <RatingStrip />
        <About />
        <Services />
        <Booking />
      </main>
      <Footer />
    </>
  )
}

export default App
