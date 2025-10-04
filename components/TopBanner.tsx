export default function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-2 px-4">
      <p className="text-sm font-semibold">
        🚚 <span className="hidden sm:inline">Free Shipping on Orders Over $50 | </span>
        <span className="animate-pulse">✨ 15% OFF First Order</span>
        <span className="hidden sm:inline"> | 🌱 100% Organic & Safe</span>
      </p>
    </div>
  );
}
