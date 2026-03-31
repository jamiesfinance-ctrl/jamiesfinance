"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 rounded-full px-5 py-3 text-sm outline-none border-none"
        style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 flex-shrink-0"
        style={{ background: "white", color: "#141414" }}
      >
        Join Free
      </button>
    </form>
  );
}
