function Contact() {
    return (
        <main className="bg-[#f5f1e8] text-[#2c2925]">

            {/* Hero */}
            <section className="border-b border-black/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7a45]">
                        Get in Touch
                    </p>

                    <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                        We'd love to hear from you.
                    </h1>

                    <p className="mt-8 max-w-xl text-sm leading-7 text-[#6f6960]">
                        Whether you have a question about an order, our collections, or
                        simply want to know more about AURELIA, our team is here to help.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">

                    {/* Contact Details */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a45]">
                            Contact
                        </p>

                        <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                            Let’s start a conversation.
                        </h2>

                        <div className="mt-12 space-y-8">

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#8a8379]">
                                    Email
                                </p>

                                <a
                                    href="mailto:hello@aurelia.com"
                                    className="mt-2 block text-sm transition hover:text-[#9b7a45]"
                                >
                                    hello@aurelia.com
                                </a>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#8a8379]">
                                    Phone
                                </p>

                                <a
                                    href="tel:+919000000000"
                                    className="mt-2 block text-sm transition hover:text-[#9b7a45]"
                                >
                                    +91 90000 00000
                                </a>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#8a8379]">
                                    Studio
                                </p>

                                <p className="mt-2 text-sm leading-7 text-[#6f6960]">
                                    AURELIA Studio
                                    <br />
                                    Kerala, India
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#8a8379]">
                                    Hours
                                </p>

                                <p className="mt-2 text-sm leading-7 text-[#6f6960]">
                                    Monday – Saturday
                                    <br />
                                    10:00 AM – 6:00 PM
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border border-black/10 bg-white/45 p-6 shadow-[0_20px_60px_rgba(30,25,20,0.06)] backdrop-blur-md sm:p-10">

                        <div className="mb-10">
                            <p className="text-xs uppercase tracking-[0.25em] text-[#9b7a45]">
                                Send a Message
                            </p>

                            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                                How can we help?
                            </h2>
                        </div>

                        <form className="space-y-6">

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em]"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-[#9a948a] focus:border-[#9b7a45]"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em]"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-[#9a948a] focus:border-[#9b7a45]"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em]"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    className="w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-[#9a948a] focus:border-[#9b7a45]"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-xs font-medium uppercase tracking-[0.18em]"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    rows="6"
                                    placeholder="Write your message..."
                                    className="w-full resize-none border border-black/15 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-[#9a948a] focus:border-[#9b7a45]"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#171512',
                                }}
                                className="w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition hover:bg-[#9b7a45] hover:text-black"
                            >
                                Send Message
                            </button>

                        </form>
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="bg-[#171512] px-6 py-20 text-center sm:px-8 lg:py-28">
                <p className="text-xs uppercase tracking-[0.35em] text-[#9b7a45]">
                    AURELIA
                </p>

                <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#f5f1e8] sm:text-5xl lg:text-6xl">
                    Thoughtful service, just like our design.
                </h2>
            </section>

        </main>
    )
}

export default Contact