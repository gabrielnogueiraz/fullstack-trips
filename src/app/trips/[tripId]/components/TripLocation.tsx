import Button from "@/components/Button";
import Image from "next/image";

interface TripLocationProps {
  location: string
  locationDescription: string
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5">
       <h2 className="font-semibold text-primaryDarker mb-5">Localizção</h2>
       
       <div className="relative h-[280px] w-full">
        <Image 
          src="/map-mobile.png"
          fill
          style={{
            objectFit: 'cover'
          }}
          className="rounded-lg shadow-md"
          alt={location}
        />
       </div>

       <h3 className="text-primaryDarker text-sm font-semibold mt-3 mb-2">{location}</h3>
       <p className="text-xs text-primaryDarker leading-5">{locationDescription}</p>
       <Button variant="outlined" className="w-full mt-5">Ver no Google Maps</Button>
    </div>
  );
}

export default TripLocation;