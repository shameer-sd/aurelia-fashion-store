function Privacy() {
    return (
        <main className="bg-[#f5f1e8] text-[#2c2925]">

            {/* Hero */}
            <section className="border-b border-black/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7a45]">
                        Customer Care
                    </p>

                    <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                        Privacy Policy
                    </h1>

                    <p className="mt-8 max-w-2xl text-sm leading-7 text-[#6f6960]">
                        Your privacy matters to us. This page explains how AURELIA
                        handles information when you use our website.
                    </p>
                </div>
            </section>

            {/* Policy Content */}
            <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:py-28">

                <div className="space-y-14">

                    {/* 01 */}
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            01 — Information We Collect
                        </p>

                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                            Information you provide
                        </h2>

                        <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                            When you create an account, place an order, or contact us,
                            we may collect information such as your name, email address,
                            shipping information, and other details necessary to provide
                            our services.
                        </p>
                    </section>

                    {/* 02 */}
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            02 — How We Use Information
                        </p>

                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                            Providing a better experience
                        </h2>

                        <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                            Information may be used to process orders, manage your
                            account, communicate with you, provide customer support,
                            improve our website, and maintain the security of our
                            services.
                        </p>
                    </section>

                    {/* 03 */}
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            03 — Your Account
                        </p>

                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                            Keeping your information secure
                        </h2>

                        <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                            We take reasonable steps to protect information associated
                            with your account and orders. You are responsible for keeping
                            your account credentials confidential.
                        </p>
                    </section>

                    {/* 04 */}
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            04 — Cookies
                        </p>

                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                            Improving the website
                        </h2>

                        <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                            Our website may use cookies or similar technologies to
                            remember preferences, support functionality, and understand
                            how visitors interact with the site.
                        </p>
                    </section>

                    {/* 05 */}
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            05 — Third Parties
                        </p>

                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                            Services that support AURELIA
                        </h2>

                        <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                            Certain services, such as payment processing, delivery, or
                            website infrastructure, may require information to be shared
                            with trusted service providers when necessary to complete
                            their role.
                        </p>
                    </section>

                    {/* 06 */}
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            06 — Your Choices
                        </p>

                        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                            Questions about your information?
                        </h2>

                        <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                            If you have questions about your personal information or
                            would like to contact us regarding privacy, please reach out
                            through our Contact page.
                        </p>

                        <a
                            href="/contact"
                            className="mt-7 inline-flex border border-black/20 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-[#9b7a45] hover:bg-[#9b7a45] hover:text-white"
                        >
                            Contact AURELIA
                        </a>
                    </section>

                </div>
            </section>

            {/* Notice */}
            <section className="border-t border-black/10 bg-[#ebe5d9] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
                <div className="mx-auto max-w-4xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                        Important
                    </p>

                    <p className="mt-5 text-sm leading-8 text-[#6f6960]">
                        This is a website privacy-page template for the AURELIA
                        project. Before using the store publicly, the policy should be
                        reviewed and updated to accurately reflect the business,
                        applicable laws, data practices, payment providers, analytics,
                        cookies, and user rights.
                    </p>
                </div>
            </section>

            {/* Closing */}
            <section className="bg-[#171512] px-6 py-20 text-center sm:px-8 lg:py-28">
                <p className="text-xs uppercase tracking-[0.35em] text-[#9b7a45]">
                    AURELIA
                </p>

                <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#f5f1e8] sm:text-5xl lg:text-6xl">
                    Your trust is part of our design.
                </h2>
            </section>

        </main>
    )
}

export default Privacy