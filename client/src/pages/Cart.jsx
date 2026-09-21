import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
  } = useCart()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  /* ================= EMPTY CART ================= */

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">
        <section className="px-6 pb-16 pt-32 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
              AURELIA / SHOPPING BAG
            </p>

            <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.82] tracking-[-2px] md:text-[105px]">
              YOUR
              <br />
              CART
            </h1>

            <p className="mt-8 max-w-[430px] text-[10px] uppercase leading-[2] tracking-[2px] text-black/45">
              Your selection is
              <br />
              currently empty.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="rounded-[32px] border border-black/10 bg-white/35 px-7 py-20 text-center shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl md:px-10">
              <p className="text-[8px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
                AURELIA COLLECTION
              </p>

              <h2 className="mt-6 font-['Cormorant_Garamond'] text-5xl font-medium md:text-6xl">
                Nothing here yet
              </h2>

              <p className="mx-auto mt-5 max-w-[420px] text-[10px] leading-[2] tracking-[1px] text-black/45">
                Discover carefully selected pieces from the AURELIA
                collection and create your selection.
              </p>

              <Link
                to="/shop"
                style={{
                  color: '#ffffff',
                  backgroundColor: '#000000',
                }}
                className="
                  mt-9
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black
                  px-9
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[2.5px]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#9b7a45]
                  hover:bg-[#9b7a45]
                "
              >
                Continue Shopping
                <span className="ml-5 text-base">→</span>
              </Link>
            </div>

            <div className="mt-16 flex flex-col justify-between gap-4 border-t border-black/10 pt-7 text-[8px] uppercase tracking-[2.5px] text-black/30 sm:flex-row">
              <p>AURELIA / SHOPPING BAG</p>
              <p>EST. 2026</p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  /* ================= CART ================= */

  return (
    <main className="min-h-screen bg-[#f3eadc] text-[#2c2925]">

      {/* ================= HEADER ================= */}

      <section className="border-b border-black/10 px-6 pb-14 pt-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-[9px] font-medium uppercase tracking-[4px] text-[#9b7a45]">
            AURELIA / SHOPPING BAG
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="font-['Cormorant_Garamond'] text-[68px] font-medium leading-[0.82] tracking-[-2px] md:text-[105px]">
                YOUR
                <br />
                CART
              </h1>

              <p className="mt-8 max-w-[430px] text-[10px] uppercase leading-[2] tracking-[2px] text-black/45">
                Your selected pieces,
                <br />
                ready for checkout.
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-[8px] uppercase leading-[2] tracking-[3px] text-black/35">
                {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
                <br />
                AURELIA / 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CART CONTENT ================= */}

      <section className="px-6 py-12 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_390px] lg:items-start lg:gap-14">

          {/* ================= ITEMS ================= */}

          <section>
            <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">
              <div>
                <p className="mb-2 text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                  Your Selection
                </p>

                <h2 className="font-['Cormorant_Garamond'] text-4xl font-medium md:text-5xl">
                  Shopping Bag
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              {cartItems.map((item) => {
                const productId = item._id || item.id
                const stock = item.stock ?? 0
                const stockChanged = item.quantity > stock
                const atStockLimit = item.quantity >= stock

                return (
                  <article
                    key={productId}
                    className="
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-black/10
                      bg-white/35
                      shadow-[0_15px_45px_rgba(0,0,0,0.03)]
                      backdrop-blur-xl
                      md:rounded-[28px]
                    "
                  >

                    {/* ================= PRODUCT ROW ================= */}

                    <div className="flex flex-col md:grid md:grid-cols-[190px_1fr]">

                      {/* ================= IMAGE ================= */}

                      <Link
                        to={`/shop/${productId}`}
                        className="
                          group
                          relative
                          block
                          h-[180px]
                          w-full
                          overflow-hidden
                          bg-[#e7ddcf]
                          md:h-auto
                          md:min-h-[280px]
                        "
                      >
                        {/* Fallback shown when image is missing/broken */}
                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-[#e7ddcf]
                          "
                        >
                          <span className="font-['Cormorant_Garamond'] text-5xl text-[#2c2925]/80">
                            A
                          </span>

                          <span className="mt-2 text-[7px] uppercase tracking-[3px] text-[#9b7a45]/70">
                            AURELIA
                          </span>

                          <span className="mt-1 text-[6px] uppercase tracking-[2px] text-black/20">
                            Image Coming Soon
                          </span>
                        </div>

                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(event) => {
                              event.currentTarget.style.display = 'none'
                            }}
                            className="
                              relative
                              z-10
                              h-full
                              min-h-[180px]
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-[1.04]
                              md:min-h-[280px]
                            "
                          />
                        )}

                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </Link>

                      {/* ================= DETAILS ================= */}

                      <div className="p-5 sm:p-6 md:p-8">

                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                              {item.category}
                            </p>

                            <Link to={`/shop/${productId}`}>
                              <h3 className="mt-2 font-['Cormorant_Garamond'] text-[28px] font-medium leading-[1] transition-opacity duration-300 hover:opacity-60 sm:text-3xl md:mt-3 md:text-4xl">
                                {item.name}
                              </h3>
                            </Link>
                          </div>

                          <p className="shrink-0 font-['Cormorant_Garamond'] text-xl font-medium sm:text-2xl">
                            ₹{item.price}
                          </p>
                        </div>

                        <div className="my-6 h-px bg-black/10 md:my-7" />

                        {/* ================= STOCK ================= */}

                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                              Available Stock
                            </p>

                            <p className="mt-2 text-[10px] font-medium">
                              {stock}
                            </p>
                          </div>

                          <span
                            className={`
                              flex
                              items-center
                              gap-2
                              rounded-full
                              border
                              px-3
                              py-2
                              text-[7px]
                              font-medium
                              uppercase
                              tracking-[1.5px]
                              ${stockChanged
                                ? 'border-red-900/15 bg-red-900/[0.04] text-red-900/70'
                                : 'border-[#9b7a45]/20 bg-[#9b7a45]/[0.05] text-[#8a693a]'
                              }
                            `}
                          >
                            <span
                              className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${stockChanged
                                  ? 'bg-red-900/60'
                                  : 'bg-[#9b7a45]'
                                }
                              `}
                            />

                            {stockChanged ? 'Stock Changed' : 'Available'}
                          </span>
                        </div>

                        {/* ================= STOCK WARNING ================= */}

                        {stockChanged && (
                          <p
                            role="alert"
                            className="
                              mt-5
                              rounded-2xl
                              border
                              border-red-900/10
                              bg-red-900/[0.035]
                              px-4
                              py-3
                              text-[8px]
                              uppercase
                              leading-[1.8]
                              tracking-[1px]
                              text-red-900/70
                            "
                          >
                            Stock has changed. Only {stock} item
                            {stock !== 1 ? 's' : ''} currently available.
                          </p>
                        )}

                        {/* ================= QUANTITY ================= */}

                        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                          <div>
                            <p className="mb-3 text-[8px] uppercase tracking-[2px] text-black/35">
                              Quantity
                            </p>

                            <div className="flex h-11 items-center rounded-full border border-black/10 bg-white/40 backdrop-blur-xl">

                              <button
                                type="button"
                                onClick={() => decreaseQuantity(productId)}
                                disabled={item.quantity <= 1}
                                className="
                                  flex
                                  h-full
                                  w-11
                                  items-center
                                  justify-center
                                  text-lg
                                  transition-colors
                                  hover:text-[#9b7a45]
                                  disabled:cursor-not-allowed
                                  disabled:opacity-25
                                "
                              >
                                −
                              </button>

                              <span className="flex min-w-9 justify-center text-[11px] font-medium">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => increaseQuantity(productId)}
                                disabled={atStockLimit || stock === 0}
                                className="
                                  flex
                                  h-full
                                  w-11
                                  items-center
                                  justify-center
                                  text-lg
                                  transition-colors
                                  hover:text-[#9b7a45]
                                  disabled:cursor-not-allowed
                                  disabled:opacity-25
                                "
                              >
                                +
                              </button>

                            </div>
                          </div>

                          {/* ================= SUBTOTAL ================= */}

                          <div className="sm:text-right">
                            <p className="text-[8px] uppercase tracking-[2px] text-black/35">
                              Subtotal
                            </p>

                            <p className="mt-2 font-['Cormorant_Garamond'] text-3xl font-medium">
                              ₹
                              {(
                                item.price * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* ================= MAX STOCK ================= */}

                        {atStockLimit && stock > 0 && (
                          <p className="mt-4 text-[8px] uppercase tracking-[1.5px] text-[#9b7a45]">
                            Maximum available quantity reached.
                          </p>
                        )}

                        {/* ================= REMOVE ================= */}

                        <button
                          type="button"
                          onClick={() => removeFromCart(productId)}
                          className="
                            mt-6
                            text-[8px]
                            font-medium
                            uppercase
                            tracking-[2px]
                            text-black/35
                            underline
                            underline-offset-4
                            transition-colors
                            hover:text-red-900/70
                          "
                        >
                          Remove Item
                        </button>

                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* ================= SUMMARY ================= */}

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[26px] border border-black/10 bg-white/45 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl md:rounded-[30px] md:p-8">

              <p className="text-[8px] font-medium uppercase tracking-[3px] text-[#9b7a45]">
                Order Summary
              </p>

              <h2 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-medium">
                Your Total
              </h2>

              <div className="my-8 h-px bg-black/10" />

              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[1.5px] text-black/40">
                  Items
                </p>

                <p className="text-[11px] font-medium">
                  {cartCount}
                </p>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="text-[9px] uppercase tracking-[1.5px] text-black/40">
                  Total
                </p>

                <p className="font-['Cormorant_Garamond'] text-4xl font-medium">
                  ₹{total.toFixed(2)}
                </p>
              </div>

              <div className="my-8 h-px bg-black/10" />

              <p className="text-[8px] uppercase leading-[1.9] tracking-[1.5px] text-black/35">
                Shipping and final payment details will be confirmed at
                checkout.
              </p>

              <Link
                to="/checkout"
                style={{
                  color: '#ffffff',
                  backgroundColor: '#000000',
                }}
                className="
                  mt-7
                  flex
                  min-h-[60px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black
                  px-6
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[2.5px]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#9b7a45]
                  hover:bg-[#9b7a45]
                "
              >
                Proceed to Checkout
                <span className="ml-5 text-base">→</span>
              </Link>

              <Link
                to="/shop"
                className="
                  mt-4
                  flex
                  min-h-[50px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/15
                  bg-white/30
                  px-6
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[2px]
                  text-[#2c2925]
                  transition-all
                  duration-300
                  hover:border-black/30
                  hover:bg-white/60
                "
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>

        {/* ================= FOOTER NOTE ================= */}

        <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-black/10 pt-7 text-[8px] uppercase tracking-[2.5px] text-black/30 sm:flex-row">
          <p>AURELIA / SHOPPING BAG</p>
          <p>EST. 2026</p>
        </div>
      </section>
    </main>
  )
}

export default Cart