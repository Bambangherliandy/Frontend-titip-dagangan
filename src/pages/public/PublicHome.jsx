import { Link } from "react-router-dom";

export default function PublicHome() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg">
              🛍
            </div>
            <div>
              <div className="font-extrabold text-lg leading-5">
                TitipDagangan
              </div>
              <div className="text-xs text-slate-500">
                Your Online Shopping Destination
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a className="hover:text-slate-900 text-slate-600" href="#featured">
              Featured
            </a>
            <a
              className="hover:text-slate-900 text-slate-600"
              href="#categories"
            >
              Categories
            </a>
            <a className="hover:text-slate-900 text-slate-600" href="#why-us">
              Why Us
            </a>
            <a
              className="hover:text-slate-900 text-slate-600"
              href="#testimonials"
            >
              Reviews
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold shadow hover:opacity-90"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
              🔥 Thousands of products, one place
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
              Shop Smarter, <span className="text-emerald-400">Save More</span>{" "}
              — Every Day
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-xl">
              Discover a wide range of quality products from trusted sellers.
              Fast shipping, secure payment, and the best prices — all in one
              place.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="px-5 py-3 rounded-2xl bg-emerald-400 text-slate-900 font-bold shadow hover:opacity-90 text-center"
              >
                Get Started — It's Free
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/15 text-center"
              >
                Sign In
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <div className="text-2xl font-black">10K+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <div className="text-2xl font-black">500+</div>
                <div className="text-sm text-white/70">Sellers</div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <div className="text-2xl font-black">4.8★</div>
                <div className="text-sm text-white/70">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border">
            <h3 className="text-xl font-extrabold">Join TitipDagangan Today</h3>
            <p className="text-sm text-slate-500 mt-1">
              Create your account and start shopping in minutes.
            </p>
            <div className="mt-5 grid gap-3">
              <div className="flex items-center gap-3 p-4 rounded-2xl border bg-slate-50">
                <span className="text-2xl">🛒</span>
                <div>
                  <div className="font-bold text-sm">Easy Shopping</div>
                  <div className="text-xs text-slate-500">
                    Browse and buy with just a few clicks
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl border bg-slate-50">
                <span className="text-2xl">🚚</span>
                <div>
                  <div className="font-bold text-sm">Fast Delivery</div>
                  <div className="text-xs text-slate-500">
                    JNE, J&T, TIKI — choose your courier
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl border bg-slate-50">
                <span className="text-2xl">🔒</span>
                <div>
                  <div className="font-bold text-sm">Secure Payment</div>
                  <div className="text-xs text-slate-500">
                    Powered by Midtrans — safe & trusted
                  </div>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold shadow hover:opacity-95 text-center"
              >
                Create Free Account
              </Link>
              <p className="text-xs text-center text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="font-bold underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Shop by Category</h2>
          <p className="mt-2 text-slate-600">
            Find exactly what you're looking for
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: "👗", name: "Fashion" },
            { icon: "📱", name: "Electronics" },
            { icon: "🏠", name: "Home & Living" },
            { icon: "💄", name: "Beauty" },
            { icon: "⚽", name: "Sports" },
            { icon: "📚", name: "Books" },
          ].map((cat) => (
            <Link
              to="/login"
              key={cat.name}
              className="h-24 rounded-2xl bg-white border flex flex-col items-center justify-center gap-2 font-bold text-slate-600 hover:border-emerald-400 hover:shadow-md transition"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold">Featured Products</h2>
              <p className="mt-2 text-slate-600">
                Top picks from our best sellers
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:opacity-95"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Premium Serum",
                price: "Rp 150.000",
                badge: "Best Seller",
              },
              { name: "Wireless Earbuds", price: "Rp 350.000", badge: "New" },
              { name: "Running Shoes", price: "Rp 450.000", badge: "Sale" },
              { name: "Tote Bag", price: "Rp 120.000", badge: "Popular" },
            ].map((product) => (
              <div
                key={product.name}
                className="rounded-3xl border bg-slate-50 p-5 hover:shadow-md transition"
              >
                <div className="relative h-44 rounded-2xl bg-slate-200 flex items-center justify-center font-bold text-slate-400 text-4xl">
                  🛍
                  <span className="absolute top-2 left-2 text-xs bg-emerald-400 text-slate-900 font-bold px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                </div>
                <div className="mt-4 font-extrabold">{product.name}</div>
                <div className="text-sm text-emerald-600 font-bold mt-1">
                  {product.price}
                </div>
                <Link
                  to="/login"
                  className="mt-3 w-full block text-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:opacity-90"
                >
                  Add to Cart
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold">Why Shop with Us?</h2>
            <p className="mt-3 text-slate-600">
              We make online shopping simple, safe, and satisfying. From
              checkout to delivery — we've got you covered.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-white border rounded-3xl p-5">
                <div className="font-extrabold">✅ Verified Sellers</div>
                <div className="text-sm text-slate-600 mt-1">
                  All sellers are verified for quality and trust.
                </div>
              </div>
              <div className="bg-white border rounded-3xl p-5">
                <div className="font-extrabold">⚡ Fast Checkout</div>
                <div className="text-sm text-slate-600 mt-1">
                  Complete your purchase in under 2 minutes.
                </div>
              </div>
              <div className="bg-white border rounded-3xl p-5">
                <div className="font-extrabold">🚚 Real-time Shipping</div>
                <div className="text-sm text-slate-600 mt-1">
                  Live shipping cost calculation via RajaOngkir.
                </div>
              </div>
              <div className="bg-white border rounded-3xl p-5">
                <div className="font-extrabold">🔒 Secure Payment</div>
                <div className="text-sm text-slate-600 mt-1">
                  Midtrans-powered payments — always safe.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-extrabold">How It Works</h3>
            <div className="mt-6 space-y-5">
              {[
                {
                  step: "1",
                  title: "Create an Account",
                  desc: "Sign up for free in less than a minute.",
                },
                {
                  step: "2",
                  title: "Browse & Add to Cart",
                  desc: "Find your favorite products and add them to cart.",
                },
                {
                  step: "3",
                  title: "Checkout",
                  desc: "Enter your address, choose courier, and confirm order.",
                },
                {
                  step: "4",
                  title: "Pay Securely",
                  desc: "Pay via Midtrans — bank transfer, e-wallet, and more.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center font-black text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-white/70">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className="mt-8 block text-center px-5 py-3 rounded-2xl bg-emerald-400 text-slate-900 font-bold hover:opacity-90"
            >
              Start Shopping Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-extrabold text-center">
            What Our Customers Say
          </h2>
          <p className="text-center text-slate-600 mt-2">
            Real reviews from happy shoppers
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                review:
                  "Super fast delivery and the product quality exceeded my expectations!",
                name: "Andi S.",
                role: "Verified Buyer",
              },
              {
                review:
                  "Payment was easy and secure. Will definitely shop here again!",
                name: "Rina M.",
                role: "Verified Buyer",
              },
              {
                review:
                  "Great selection of products and the shipping cost calculator is very helpful.",
                name: "Budi P.",
                role: "Verified Buyer",
              },
            ].map((t) => (
              <div key={t.name} className="border rounded-3xl p-6 bg-slate-50">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <p className="mt-2 text-sm text-slate-600">"{t.review}"</p>
                <div className="mt-4 text-sm font-bold">— {t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="bg-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold">
              Ready to Start Shopping?
            </h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">
              Join thousands of happy customers. Sign up now and enjoy a
              seamless shopping experience.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl bg-emerald-400 text-slate-900 font-bold hover:opacity-90"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/15"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-extrabold text-xl">🛍 TitipDagangan</div>
            <p className="mt-2 text-white/70 text-sm">
              Your one-stop online shopping destination. Quality products, fast
              delivery, and secure payment.
            </p>
          </div>
          <div>
            <div className="font-extrabold">Quick Links</div>
            <div className="mt-3 grid gap-2 text-sm text-white/80">
              <a className="hover:underline" href="#featured">
                Featured Products
              </a>
              <a className="hover:underline" href="#categories">
                Categories
              </a>
              <a className="hover:underline" href="#why-us">
                Why Us
              </a>
              <a className="hover:underline" href="#testimonials">
                Reviews
              </a>
            </div>
          </div>
          <div>
            <div className="font-extrabold">We Support</div>
            <div className="mt-3 text-sm text-white/80 space-y-1">
              <div>🚚 JNE, J&T, TIKI Shipping</div>
              <div>💳 Midtrans Secure Payment</div>
              <div>📦 Real-time Shipping Cost</div>
              <div>🔒 SSL Encrypted Checkout</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-white/70 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <div>
              © <span className="font-bold">TitipDagangan</span>. All rights
              reserved.
            </div>
            <div className="text-white/60">Made with ❤️ in Indonesia</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
