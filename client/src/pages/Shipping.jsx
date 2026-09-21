function Shipping() {
    return (
        <main className="bg-[#f5f1e8] text-[#2c2925]">

            {/* Hero */}
            <section className="border-b border-black/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7a45]">
                        Customer Care
                    </p>

                    <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                        Shipping & Returns
                    </h1>

                    <p className="mt-8 max-w-2xl text-sm leading-7 text-[#6f6960]">
                        Everything you need to know about receiving your AURELIA
                        pieces and making a return.
                    </p>
                </div>
            </section>

            {/* Information */}
            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

                    {/* Shipping */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            01 — Shipping
                        </p>

                        <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
                            Delivered with care.
                        </h2>

                        <div className="mt-8 space-y-6 text-sm leading-8 text-[#6f6960]">
                            <p>
                                Orders are carefully prepared and packed before being
                                dispatched from our studio.
                            </p>

                            <p>
                                Once your order has been shipped, you will receive
                                tracking information so you can follow its journey.
                            </p>

                            <p>
                                Delivery times may vary depending on your location and
                                courier availability.
                            </p>
                        </div>
                    </div>

                    {/* Returns */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            02 — Returns
                        </p>

                        <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
                            Made to feel right.
                        </h2>

                        <div className="mt-8 space-y-6 text-sm leading-8 text-[#6f6960]">
                            <p>
                                If your purchase isn't quite right, you can contact our
                                customer care team to begin a return.
                            </p>

                            <p>
                                Items should be unused, unworn, and returned in their
                                original condition and packaging.
                            </p>

                            <p>
                                Please contact us before sending an item back so we can
                                guide you through the return process.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Policy Cards */}
            <section className="border-y border-black/10 bg-[#ebe5d9]">
                <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">

                    <div className="mb-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            Good to Know
                        </p>

                        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                            A few important details.
                        </h2>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-3">

                        <div className="bg-[#ebe5d9] p-8 sm:p-10">
                            <span className="font-serif text-3xl">01</span>

                            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
                                Order Processing
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#6f6960]">
                                Orders are processed during our regular business hours.
                                Processing time can vary during busy periods.
                            </p>
                        </div>

                        <div className="bg-[#ebe5d9] p-8 sm:p-10">
                            <span className="font-serif text-3xl">02</span>

                            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
                                Order Changes
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#6f6960]">
                                Need to make a change? Contact us as soon as possible
                                after placing your order.
                            </p>
                        </div>

                        <div className="bg-[#ebe5d9] p-8 sm:p-10">
                            <span className="font-serif text-3xl">03</span>

                            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]">
                                Customer Care
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#6f6960]">
                                Our team is available to help with questions about
                                orders, delivery, and returns.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:py-28">

                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                        Frequently Asked
                    </p>

                    <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                        Questions
                    </h2>
                </div>

                <div className="mt-12 divide-y divide-black/10 border-y border-black/10">

                    <details className="group py-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                            How can I track my order?

                            <span className="ml-6 text-xl transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f6960]">
                            Once your order has been dispatched, tracking information
                            will be provided so you can follow your delivery.
                        </p>
                    </details>

                    <details className="group py-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                            Can I change or cancel my order?

                            <span className="ml-6 text-xl transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f6960]">
                            Contact our customer care team as soon as possible. We will
                            do our best to accommodate your request before the order is
                            dispatched.
                        </p>
                    </details>

                    <details className="group py-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                            How do I return an item?

                            <span className="ml-6 text-xl transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f6960]">
                            Contact us before sending your item back. Our customer care
                            team will provide the necessary return instructions.
                        </p>
                    </details>

                </div>
            </section>

            {/* Closing */}
            <section className="bg-[#171512] px-6 py-20 text-center sm:px-8 lg:py-28">
                <p className="text-xs uppercase tracking-[0.35em] text-[#9b7a45]">
                    AURELIA
                </p>

                <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#f5f1e8] sm:text-5xl lg:text-6xl">
                    Thoughtful from purchase to delivery.
                </h2>
            </section>

        </main>
    )
}

export default Shipping