"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyEvents } from "../../../utils/data";
import Link from "next/link";


function formatDateRange(startDate:any, endDate:any) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
}

export default function EventList() {
  const [searchQuery, setSearchQuery] = useState("");
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const filteredEvents = dummyEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-2 h-5 w-5 text-white" />
        <Input
          type="text"
          placeholder="Search events..."
          className="pl-10 border border-[#DAE6EA] text-white placeholder:text-white/60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-64 md:h-auto">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <h3 className="text-2xl font-bold text-[#07153B] mb-2">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-[#EC3B3B]" />
                    <span>{formatDateRange(event.startDate, event.endDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-[#EC3B3B]" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-semibold text-[#EC3B3B]">{event.price}</span>
                  {event.endDate < new Date() && (
                    <span className="ml-4 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Past Event</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">{event.description}</p>
                <div className="flex gap-3">
                  <Link href={`/${locale}/news-room/${event.id}`} className="flex gap-2 group transition-all duration-500 text-[#07153B] border border-[#07153B] hover:bg-[#07153B] px-3 py-2 hover:text-white">
                    More Details
                    <ArrowRight className="group-hover:translate-x-1.5 duration-500 transition-all"/>
                  </Link>
                  {event.endDate >= new Date() && (
                    <Button className="bg-[#07153B] hover:bg-[#0a1f4d]">
                      Register Now
                    </Button>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
