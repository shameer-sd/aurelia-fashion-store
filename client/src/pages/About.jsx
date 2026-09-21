function About() {
  return (
    <main className="bg-[#f5f1e8] text-[#2c2925]">

      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <img
          src="/images/womens-collection.jpg"
          alt="Aurelia collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative flex min-h-[70vh] items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12 lg:pb-20">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8c7a4]">
              About Aurelia
            </p>

            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl">
              Designed for a life well lived.
            </h1>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
              Our Story
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Luxury without excess.
            </h2>
          </div>

          <div className="max-w-2xl space-y-6 text-[15px] leading-8 text-[#6f6960]">
            <p>
              AURELIA was created around a simple idea: the things we wear
              should feel as considered as the lives we lead.
            </p>

            <p>
              We believe modern luxury is found in thoughtful design,
              beautiful materials, and details that reveal themselves over
              time. Every piece is designed to feel relevant today while
              remaining timeless tomorrow.
            </p>

            <p>
              From refined everyday essentials to distinctive statement
              pieces, AURELIA brings together a carefully considered
              collection for those who appreciate quiet confidence and
              enduring style.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-black/10 bg-[#ebe5d9]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
              Our Philosophy
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Less noise. More character.
            </h2>

            <p className="mt-8 text-[15px] leading-8 text-[#6f6960]">
              We create with restraint. Clean silhouettes, considered
              proportions, understated tones, and details that reward a
              closer look define the AURELIA aesthetic.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-3">
            <div className="bg-[#ebe5d9] p-8 sm:p-10">
              <span className="font-serif text-3xl">01</span>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
                Timeless
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6f6960]">
                Pieces designed to move beyond seasons and trends.
              </p>
            </div>

            <div className="bg-[#ebe5d9] p-8 sm:p-10">
              <span className="font-serif text-3xl">02</span>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
                Considered
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6f6960]">
                Every silhouette and detail has a purpose.
              </p>
            </div>

            <div className="bg-[#ebe5d9] p-8 sm:p-10">
              <span className="font-serif text-3xl">03</span>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
                Effortless
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6f6960]">
                Modern pieces made to become part of your everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-[#171512] px-6 py-24 text-center sm:px-8 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7a45]">
          AURELIA
        </p>

        <h2 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-[#f5f1e8] sm:text-5xl lg:text-7xl">
          Style that speaks quietly.
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-[#a9a39a]">
          Discover the collection and find pieces made to stay with you.
        </p>
      </section>

    </main>
  )
}

export default About