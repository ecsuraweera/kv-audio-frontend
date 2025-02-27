export default function TestCard() {
    return (

    //main component//
    <div className="flex justify-center items-center h-screen bg-purple-100">
    <div className="w-[350px] h-[500px] bg-blue-600 flex flex-col">

        {/*test card*/}
        <div className="flex justify-center items-center flex-1 ">Test Card</div>

        {/* border */}
        <div className="flex justify-center items-center mt-2 border-t-2 border-white"></div>

        

        {/*price*/}
        <div className="flex justify-center items-center h-[300px]">Price</div>

        {/* Second Border (Closer to Price) */}
        <div className="border-bborder-white w-full h-[2px]"></div>


    </div>
    </div>
 );
}