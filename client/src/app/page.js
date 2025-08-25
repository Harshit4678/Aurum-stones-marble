import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] overflow-hidden font-serif">
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-[#f9f6f1]">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
            Elevate Every Detail of Your Interiors
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We specialize in custom-designed luxury pieces crafted from rare
            marbles, semi-precious stones, and artisan finishes—tailored just
            for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
          {[
            {
              title: "Gemstone Tabletops",
              desc: "Handcrafted from rare semi-precious stones, each piece is a unique luxury statement.",
              icon: "💎",
            },
            {
              title: "Custom Interiors",
              desc: "From concept to finish, we create timeless decor personalized to your space.",
              icon: "🛋️",
            },
            {
              title: "Pan-India Delivery",
              desc: "Carefully packaged and delivered to luxury residences & offices across India.",
              icon: "📦",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-xl border border-[#e7e4df] hover:shadow-2xl transition duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
