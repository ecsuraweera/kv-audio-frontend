export default function ProductCard({ item }) {
    if (!item) return null; // Prevent rendering if item is undefined

    const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

    return (
        <div className="bg-white shadow-lg p-3 w-[250px] h-[440px] transition-transform transform hover:scale-105 hover:bg-secondary flex flex-col justify-between m-1">
            {/* Upper Section: Image & Details */}
            <div className="flex flex-col gap-2">
                {/* Product Image */}
                <img 
                    src={item.image?.[0] || placeholderImage} 
                    alt={item.name || "Product Image"} 
                    className="w-full h-48 object-cover" // Reduced height
                />

                {/* Product Details */}
                <div className="flex flex-col gap-1">
                    <p className="text-gray-600 text-xs">PID: <span className="font-semibold">{item.key}</span></p>
                    <h2 className="text-lg font-bold text-accent">{item.name}</h2>
                    <p className="text-gray-600 text-xs">Category: <span className="font-semibold">{item.category}</span></p>
                    <p className="text-gray-600 text-xs">Dimensions: <span className="font-semibold">{item.dimensions}</span></p>

                    {/* Description */}
                    <div className="text-sm text-gray-500">
                        <p className="overflow-hidden text-ellipsis h-[32px]">
                            {item.description.length > 60 ? item.description.slice(0, 60) + "..." : item.description}
                        </p>
                        {item.description.length > 60 && (
                            <button className="text-blue-500 text-xs font-semibold" onClick={() => alert(item.description)}>
                                Read More
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Price & Button (Always Aligned) */}
            <div className="border-t border-gray-200 gap-1 ">
                {/* Price & Availability */}
                <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-lg font-semibold text-yellow-600">Rs.{item.price}/=</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${item.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.availability ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* Button */}
                <button className="w-full bg-accent hover:bg-purple-600 text-white py-2 rounded-xl font-semibold">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
