export default function ProductCard({ item }) {
    if (!item) return null; // Prevent rendering if item is undefined

    const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

    return (
        <div className="bg-white shadow-lg p-4 w-[250px] h-[520px] transition-transform transform hover:scale-105 hover:bg-blue-100 flex flex-col gap-2 m-1">
            {/* Product Image */}
            <img 
                src={item.image?.[0] || placeholderImage} 
                alt={item.name || "Product Image"} 
                className="w-full h-48 object-cover rounded-xl" 
            />

            {/* Product Details */}
            <div className="mt-2 flex flex-col gap-1 flex-grow">
                <p className="text-gray-600 text-xs">PID: <span className="font-semibold">{item.key}</span></p>
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-xs">Category: <span className="font-semibold">{item.category}</span></p>
                <p className="text-gray-600 text-xs">Dimensions: <span className="font-semibold">{item.dimensions}</span></p>
                
                {/* Description with Read More */}
                <div className="relative mb-2">
                    <p className="text-gray-500 text-sm h-[48px] overflow-hidden text-ellipsis">
                        {item.description.length > 80 ? item.description.slice(0, 80) + "..." : item.description}
                    </p>
                    {item.description.length > 80 && (
                        <button className="text-blue-500 text-xs font-semibold mt-1" onClick={() => alert(item.description)}>
                            Read More
                        </button>
                    )}
                </div>
            
                {/* Price & Availability */}
                <div className="border-t border-gray-100 p-2 w-full flex justify-between items-center">
                    <span className="text-lg font-semibold text-yellow-600">Rs.{item.price}/=</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.availability ? "In Stock" : "Out of Stock"}
                    </span>
                </div>
            </div>

            {/* Button Area */}
            <div className="border-t border-gray-100 p-2 w-full flex justify-center">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
