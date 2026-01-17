"use client";

import { useState, useEffect } from "react";
import { Map, MapClusterLayer, MapPopup, MapControls, useMap } from "@/components/ui/map";
import Sidebar from "./SideBar";


// to remove the pop
function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return;
    const handleClick = () => onMapClick();
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
}

interface PlaceProperties {
  id: number;
  location: string;
  students: string[];
  companies: string[];
}

const places = [
  {
    id: 1,
    location: "T. Nagar, Chennai",
    students: ["Rahul"],
    companies: ["Zoho", "Freshworks"],
    lng: 80.2341,
    lat: 13.0418,
  },
  {
    id: 2,
    location: "Sholinganallur, Chennai",
    students: ["Divya", "Suresh"],
    companies: ["HCL", "TCS", "Accenture"],
    lng: 80.2279,
    lat: 12.901,
  },
  {
    id: 3,
    location: "Adyar, Chennai",
    students: ["Meera"],
    companies: ["Oracle"],
    lng: 80.2565,
    lat: 13.0012,
  },
  {
    id: 4,
    location: "Besant Nagar, Chennai",
    students: ["Arjun"],
    companies: ["Beachside Ventures"],
    lng: 80.2667,
    lat: 13.0003,
  },
  {
    id: 5,
    location: "Guindy, Chennai",
    students: ["Priya", "Vikram"],
    companies: ["Olympia Tech Park"],
    lng: 80.2206,
    lat: 13.0067,
  },
  {
    id: 6,
    location: "Mylapore, Chennai",
    students: ["Anjali"],
    companies: ["Heritage Firms"],
    lng: 80.2677,
    lat: 13.0333,
  },
  {
    id: 7,
    location: "Indiranagar, Bangalore",
    students: ["James"],
    companies: ["FinTech Inc"],
    lng: 77.6412,
    lat: 12.9719,
  },
  {
    id: 8,
    location: "Whitefield, Bangalore",
    students: ["Sophia", "David"],
    companies: ["DataSystems", "Google"],
    lng: 77.75,
    lat: 12.9698,
  },
  {
    id: 9,
    location: "Koramangala, Bangalore",
    students: ["Emma"],
    companies: ["Flipkart", "Swiggy"],
    lng: 77.6245,
    lat: 12.9352,
  },
  {
    id: 10,
    location: "Jayanagar, Bangalore",
    students: ["Lucas"],
    companies: ["Local Businesses"],
    lng: 77.5838,
    lat: 12.9308,
  },
  {
    id: 11,
    location: "HSR Layout, Bangalore",
    students: ["Manu Paaji"],
    companies: ["Aceternity", "InnovateLabs"],
    lng: 77.6446,
    lat: 12.9121,
  },
  {
    id: 12,
    location: "Malleshwaram, Bangalore",
    students: ["Sarah"],
    companies: ["DevSolutions"],
    lng: 77.5691,
    lat: 12.9982,
  },
  {
    id: 13,
    location: "Rajajinagar, Bangalore",
    students: ["Amit"],
    companies: ["StartupHub"],
    lng: 77.5525,
    lat: 12.9901,
  },
  {
    id: 14,
    location: "Connaught Place, Delhi",
    students: ["Ishaan"],
    companies: ["Zomato", "Paytm"],
    lng: 77.2167,
    lat: 28.6315,
  },
  {
    id: 15,
    location: "Hauz Khas, Delhi",
    students: ["Kavya"],
    companies: ["Creative Agency"],
    lng: 77.2065,
    lat: 28.5494,
  },
  {
    id: 16,
    location: "Rohini, Delhi",
    students: ["Aarav"],
    companies: ["Tech Solutions"],
    lng: 77.1131,
    lat: 28.7041,
  },
  {
    id: 17,
    location: "Hinjewadi, Pune",
    students: ["Siddharth"],
    companies: ["Infosys", "Wipro"],
    lng: 73.7334,
    lat: 18.5913,
  },
  {
    id: 18,
    location: "Koregaon Park, Pune",
    students: ["Rohan"],
    companies: ["Pubmatic"],
    lng: 73.8907,
    lat: 18.5362,
  },
  {
    id: 19,
    location: "Baner, Pune",
    students: ["Neha"],
    companies: ["Siemens"],
    lng: 73.7922,
    lat: 18.5597,
  },
  {
    id: 20,
    location: "Gachibowli, Hyderabad",
    students: ["Nikhil"],
    companies: ["Microsoft", "Amazon"],
    lng: 78.3489,
    lat: 17.4401,
  },
  {
    id: 21,
    location: "Madhapur, Hyderabad",
    students: ["Sanya"],
    companies: ["Facebook", "Google"],
    lng: 78.3915,
    lat: 17.4483,
  },
  {
    id: 22,
    location: "Banjara Hills, Hyderabad",
    students: ["Varun"],
    companies: ["Dr. Reddy's"],
    lng: 78.4447,
    lat: 17.4156,
  },
  {
    id: 23,
    location: "Malviya Nagar, Jaipur",
    students: ["Yash"],
    companies: ["Genpact"],
    lng: 75.8189,
    lat: 26.8549,
  },
  {
    id: 24,
    location: "Vaishali Nagar, Jaipur",
    students: ["Tanvi"],
    companies: ["GirnarSoft"],
    lng: 75.7433,
    lat: 26.9075,
  },
  {
    id: 25,
    location: "Mansarovar, Jaipur",
    students: ["Abhishek"],
    companies: ["Local Tech"],
    lng: 75.7644,
    lat: 26.8692,
  },
];

const placesGeoJSON = {
  type: "FeatureCollection" as const,
  features: places.map((place) => ({
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: [place.lng, place.lat] as [number, number],
    },
    properties: {
      id: place.id,
      location: place.location,
      students: place.students,
      companies: place.companies,
    },
  })),
};

export default function ClusterMap() {
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: PlaceProperties;
  } | null>(null);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden">

      <Sidebar />
      <Map center={[78.9629, 20.5937]} zoom={4} fadeDuration={0}>

       
        <MapClickHandler onMapClick={() => setSelectedPoint(null)} />
        <MapClusterLayer<PlaceProperties>
          data={placesGeoJSON}
          clusterRadius={30}
          clusterMaxZoom={14}
          clusterColors={["#22c55e", "#eab308", "#ef4444"]}
          pointColor="#3b82f6"
          onPointMouseEnter={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
        />

        {selectedPoint && (
          <MapPopup
            key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            closeOnClick={false}
            focusAfterOpen={false}
          >
            <div className="min-w-[200px] space-y-2 p-3">
              <p className="text-base font-semibold">
                {selectedPoint.properties.location}
              </p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Companies: {selectedPoint.properties.companies.length}</p>
                <p>Students: {selectedPoint.properties.students.length}</p>
              </div>
            </div>
          </MapPopup>
        )}

        <MapControls />
      </Map>
    </div>
  );
}
