import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          // Curate 4 highlight items
          setFeaturedProducts(data.products.slice(0, 4))
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingFeatured(false))
  }, [])

  const categories = [
    {
      title: 'Women',
      subtitle: 'Haute Silhouettes & Evening Dresses',
      image: '/images/womens-collection.jpg',
      link: '/shop?gender=Women',
      count: '18 Pieces',
    },
    {
      title: 'Men',
      subtitle: 'Italian Blazers & Cashmere Knitwear',
      image: '/images/mens-collection.jpg',
      link: '/shop?gender=Men',
      count: '16 Pieces',
    },
    {
      title: 'Shoes',
      subtitle: 'Handcrafted Derby & Chelsea Boots',
      image: '/images/italian-chelsea-boots.jpg',
      link: '/shop?category=Shoes',
      count: '8 Pieces',
    },
    {
      title: 'Accessories',
      subtitle: 'Full-Grain Leather Totes & Watches',
      image: '/images/aurelia-leather-tote.jpg',
      link: '/shop?category=Accessories',
      count: '10 Pieces',
    },
  ]

  return (
    <main className="w-full overflow-x-hidden bg-[#0b0b0b]">

      {/* =========================================
            MEN'S COLLECTION (EDITORIAL HERO)
      ========================================= */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#171513]">
        {/* HERO IMAGE */}
        <img
          src="/images/mens-collection.jpg"
          alt="AURELIA Men's Collection"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* CINEMATIC OVERLAY */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* HERO CONTENT */}
        <div className="absolute left-[7.5%] top-1/2 z-[2] -translate-y-[42%] text-[#111]">
          <p className="mb-[32px] text-[11px] font-medium leading-[1.8] tracking-[4px] text-[#111]">
            TIMELESS FASHION
            <br />
            MODERN LUXURY
          </p>

          <h1 className="m-0 font-['Cormorant_Garamond'] text-[clamp(65px,7.5vw,125px)] font-medium leading-[0.82] tracking-[-3px]">
            MEN'S
            <br />
            COLLECTION
          </h1>

          <p className="relative mb-[34px] mt-[36px] pt-[22px] text-[11px] leading-[1.8] tracking-[4px] before:absolute before:left-0 before:top-0 before:h-px before:w-[58px] before:bg-[#111]">
            CONFIDENCE LOOKS
            <br />
            GOOD ON YOU
          </p>

          <Link
            to="/shop?gender=Men"
            style={{ color: '#ffffff' }}
            className="group inline-flex min-h-[58px] items-center gap-[28px] rounded-full bg-[#111] px-[32px] text-[11px] font-semibold tracking-[2.5px] text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#252320] hover:shadow-[0_16px_36px_rgba(0,0,0,0.3)]"
          >
            EXPLORE COLLECTION
            <span className="text-[18px] transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>

        {/* RIGHT EDITORIAL TEXT */}
        <div className="absolute right-[4%] top-[22%] z-[2] hidden text-left text-[9px] leading-[1.9] tracking-[3px] text-white/85 after:mt-[22px] after:block after:h-px after:w-[40px] after:bg-white/70 sm:block">
          STYLE
          <br />
          DISCIPLINE
          <br />
          EXPRESSION
          <br />
          YOU
        </div>

        {/* SLIDER INDICATOR */}
        <div className="absolute bottom-[7%] left-[7.5%] z-[2] flex items-center gap-[14px] text-[10px] tracking-[2px] text-white/90">
          <span>01</span>
          <span className="h-px w-[80px] bg-white/70" />
          <span>03</span>
        </div>
      </section>

      {/* =========================================
            LUXURY BRAND TICKER MARQUEE
      ========================================= */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#141210] py-4 text-white/90">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-medium tracking-[3.5px] uppercase">
          <span className="mx-6 text-[#c9ad7a]">✦ BESPOKE ATELIER TAILORING</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6">COMPLIMENTARY WORLDWIDE EXPRESS COURIER</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6 text-[#c9ad7a]">✦ MASTER PERFUMERY & SCENTS</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6">SUSTAINABLE NATURAL FABRICS</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6 text-[#c9ad7a]">✦ PRIVATE SALON CONCIERGE</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6">TIMELESS MODERN LUXURY</span>
          <span className="mx-6 text-white/70">·</span>
          {/* Duplicate for infinite loop */}
          <span className="mx-6 text-[#c9ad7a]">✦ BESPOKE ATELIER TAILORING</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6">COMPLIMENTARY WORLDWIDE EXPRESS COURIER</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6 text-[#c9ad7a]">✦ MASTER PERFUMERY & SCENTS</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6">SUSTAINABLE NATURAL FABRICS</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6 text-[#c9ad7a]">✦ PRIVATE SALON CONCIERGE</span>
          <span className="mx-6 text-white/70">·</span>
          <span className="mx-6">TIMELESS MODERN LUXURY</span>
        </div>
      </section>

      {/* =========================================
            WOMEN'S COLLECTION (SPLIT GRID)
      ========================================= */}
      <section className="w-full overflow-hidden bg-[#e8dfd2] text-[#111]">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
          {/* LEFT EDITORIAL CONTENT */}
          <div className="flex min-h-[620px] items-center px-[7.5%] py-[80px] lg:min-h-[78vh]">
            <div className="w-full max-w-[680px]">
              <p className="mb-[34px] text-[10px] font-medium tracking-[4px] text-[#111]">
                TIMELESS FASHION
                <br />
                MODERN LUXURY
              </p>

              <h2 className="m-0 font-['Cormorant_Garamond'] text-[clamp(56px,6.8vw,110px)] font-medium leading-[0.8] tracking-[-3px] text-[#111]">
                WOMEN'S
                <br />
                COLLECTION
              </h2>

              <div className="mt-[38px]">
                <div className="mb-[22px] h-px w-[55px] bg-[#111]" />
                <p className="text-[10px] font-medium leading-[1.9] tracking-[3.5px] text-[#222]">
                  REFINED SILHOUETTES.
                  <br />
                  SOFT STRUCTURES.
                  <br />
                  TIMELESS ELEGANCE.
                </p>
              </div>

              <Link
                to="/shop?gender=Women"
                style={{ color: '#ffffff' }}
                className="group mt-[36px] inline-flex min-h-[58px] items-center gap-[30px] rounded-full bg-[#111] px-[32px] text-[10px] font-semibold tracking-[2.5px] text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#222] hover:shadow-[0_16px_36px_rgba(0,0,0,0.2)]"
              >
                EXPLORE COLLECTION
                <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>

              <div className="mt-[70px] flex items-center gap-[14px] text-[9px] tracking-[2px] text-[#111]">
                <span>02</span>
                <span className="h-px w-[75px] bg-[#111]/50" />
                <span>03</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[500px] lg:min-h-[78vh]">
            <img
              src="/images/womens-collection.jpg"
              alt="AURELIA Women's Collection"
              className="block h-full min-h-[500px] w-full object-cover object-center lg:min-h-[78vh]"
            />

            <div className="absolute right-[7%] top-[14%] z-[2] text-left text-[9px] leading-[1.9] tracking-[3px] text-white">
              STYLE
              <br />
              DISCIPLINE
              <br />
              EXPRESSION
              <br />
              YOU
              <div className="mt-[22px] h-px w-[40px] bg-white/70" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
            CURATED CAPSULE (FEATURED PRODUCTS)
      ========================================= */}
      <section className="bg-[#f3eadc] px-6 py-20 sm:px-10 md:py-28 text-[#2c2925]">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[3.5px] text-[#9b7a45]">
                Seasonal Edit · 2026
              </p>
              <h2 className="mt-2 font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-medium tracking-tight text-[#111]">
                Curated Capsule Drops
              </h2>
            </div>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#2c2925] hover:text-[#9b7a45] transition-colors"
            >
              <span>View Full Lookbook</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="mt-12">
            {loadingFeatured ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="aspect-[4/5] rounded-2xl bg-black/5 skeleton-shimmer" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
            PORTALS / CATEGORIES OF EXCELLENCE
      ========================================= */}
      <section className="bg-[#121110] px-6 py-24 text-white sm:px-10 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[9px] uppercase tracking-[4px] text-[#c9ad7a]">
              The Aurelia Universe
            </p>
            <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-medium">
              Explore Our Ateliers
            </h2>
            <p className="mt-3 text-xs text-white/50 font-light leading-relaxed">
              Every category is meticulously curated to bring uncompromising craftsmanship into your daily rituals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-[#1c1a17]"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${cat.title === 'Men'
                    ? 'object-[75%_center]'
                    : 'object-center'
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

                <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end">
                  <span className="text-[8px] uppercase tracking-[2px] text-[#c9ad7a]">
                    {cat.count}
                  </span>
                  <h3 className="mt-1 font-['Cormorant_Garamond'] text-3xl font-medium text-white group-hover:text-[#dfc89f] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/60 font-light line-clamp-1">
                    {cat.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center text-[9px] uppercase tracking-[2px] text-white/80 group-hover:text-[#c9ad7a] transition-colors">
                    Discover Edit →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
            THE AURELIA PILLARS / ATELIER PROMISES
      ========================================= */}
      <section className="border-t border-white/10 bg-[#0d0c0b] px-6 py-20 sm:px-10 md:py-28 text-[#f5f1e8]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-[#c9ad7a]/30 transition-all">
              <span className="font-['Cormorant_Garamond'] text-3xl text-[#c9ad7a]">01</span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[2px]">
                Noble Materials
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#8f897f] font-light">
                Hand-spun mulberry silks, GOTS certified Egyptian cottons, and responsibly sourced Italian leathers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-[#c9ad7a]/30 transition-all">
              <span className="font-['Cormorant_Garamond'] text-3xl text-[#c9ad7a]">02</span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[2px]">
                Bespoke Precision
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#8f897f] font-light">
                Sculpted silhouettes shaped with artisanal discipline to ensure impeccable drape and comfort.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-[#c9ad7a]/30 transition-all">
              <span className="font-['Cormorant_Garamond'] text-3xl text-[#c9ad7a]">03</span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[2px]">
                Express Courier
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#8f897f] font-light">
                Complimentary tracked express white-glove shipping on all curated selections with carbon-neutral transit.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-[#c9ad7a]/30 transition-all">
              <span className="font-['Cormorant_Garamond'] text-3xl text-[#c9ad7a]">04</span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[2px]">
                Salon Concierge
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#8f897f] font-light">
                Dedicated styling consultants available for size consultation, private orders, and styling assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home