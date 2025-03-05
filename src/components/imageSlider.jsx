import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    console.log(images);
    const [selectedImage, setSelectedImage] = useState(images[0]);


    return (
        <div className="w-full h-full flex flex-col items-center">
            <img src={selectedImage} alt="image" className="w-full h-[300px] object-contain" />
            <div className="w-full mt-[20px] h-[150px] flex justify-center">
                {
                    images.map((image, index) => {
                        return (
                            <img key={index} src={image} alt="image" className={`w-full mr-[2px] h-[150px] object-contain cursor-pointer hover:scale-110 ${selectedImage === image ? "border-2 border-accent" : ""}`} onClick={() => setSelectedImage(image)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}