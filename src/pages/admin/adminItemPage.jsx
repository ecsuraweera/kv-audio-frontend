const sampleArr = [
    {
      key: "PRD001",
      name: "Wireless Headphones",
      price: 59.99,
      catagory: "Electronics",
      dimensions: "20x15x10 cm",
      description: "High-quality wireless headphones with noise cancellation.",
      availability: true,
      image: ["https://example.com/images/headphones.jpg"]
    },
    {
      key: "PRD002",
      name: "Smartphone Holder",
      price: 19.99,
      catagory: "Accessories",
      dimensions: "10x5x5 cm",
      description: "Adjustable smartphone holder for car dashboards.",
      availability: true,
      image: ["https://example.com/images/phone-holder.jpg"]
    },
    {
      key: "PRD003",
      name: "LED Desk Lamp",
      price: 29.99,
      catagory: "Home Decor",
      dimensions: "30x10x10 cm",
      description: "Stylish LED desk lamp with adjustable brightness.",
      availability: false,
      image: ["https://example.com/images/desk-lamp.jpg"]
    },
    {
      key: "PRD004",
      name: "Bluetooth Speaker",
      price: 45.99,
      catagory: "Electronics",
      dimensions: "15x10x10 cm",
      description: "Portable Bluetooth speaker with superior sound quality.",
      availability: true,
      image: ["https://example.com/images/bluetooth-speaker.jpg"]
    },
    {
      key: "PRD005",
      name: "Ergonomic Office Chair",
      price: 199.99,
      catagory: "Furniture",
      dimensions: "120x60x60 cm",
      description: "Comfortable ergonomic office chair with lumbar support.",
      availability: true,
      image: ["https://example.com/images/office-chair.jpg"]
    }
  ];
  
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemPage() {

    const [items, setItems] = useState(sampleArr);

    return (
        <div className="w-full h-screen relative" >
            <table> 
                <thead>
                    <th>key</th>
                    <th>name</th>
                    <th>price</th>
                    <th>catagory</th>
                    <th>dimensions</th>
                    <th>availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product) => {
                            return (
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.catagory}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/items/add"> 
            <CiCirclePlus className="text-[50px] absolute right-2 bottom-2 hover:text-red-400" />
            </Link>
        </div>
    )
}