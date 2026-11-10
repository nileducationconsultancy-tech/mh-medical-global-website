import React, { useState } from "react";
import { ImageWithFallback } from "../common/ImageWithFallback";

export function StudentLifeGallery() {
  const [activeTab, setActiveTab] = useState("all");

  const photos = [
    {
      title: "Anatomy Dissection & 3D Simulation Labs",
      category: "academic",
      image: "/collageimages/banner-1.png",
      tag: "Academic Training",
      desc: "Modern virtual 3D dissection suites and cadaveric laboratories at Tashkent Medical Academy."
    },
    {
      title: "Bedside Clinical Rotations",
      category: "hospital",
      image: "/collageimages/banner-2.png",
      tag: "Hospital Exposure",
      desc: "Indian students conducting morning clinical rounds at the 1st Republican Hospital."
    },
    {
      title: "Campus Library & Study Halls",
      category: "academic",
      image: "/collageimages/banner-3.png",
      tag: "Campus Infrastructure",
      desc: "Quiet, air-conditioned digital libraries equipped with international medical journals."
    },
    {
      title: "Indian Festivals & Cultural Nights",
      category: "life",
      image: "/collageimages/banner-4.png",
      tag: "Student Community",
      desc: "Grand Diwali and Eid celebrations organized by Indian student associations in Tashkent & Samarkand."
    },
    {
      title: "Modern Hostel Study Lounges",
      category: "life",
      image: "/collageimages/banner-5.png",
      tag: "Hostel Living",
      desc: "Spacious hostel rooms with 24/7 central winter heating and high-speed research Wi-Fi."
    },
    {
      title: "Annual Sports & Cricket Tournaments",
      category: "life",
      image: "/collageimages/banner-6.png",
      tag: "Campus Sports",
      desc: "Inter-university cricket and football leagues hosted across university athletic grounds."
    }
  ];

  const filteredPhotos = activeTab === "all" ? photos : photos.filter((p) => p.category === activeTab);

  return (
    <section className="bg-[#F7FAFC] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D9E2EC] shadow-xs font-sans space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Vibrant Campus Experience
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#063280]">
            Student Life & Hospital Environment in Uzbekistan
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Experience world-class digital dissection suites, active bedside clinical postings, and a warm community of over 10,000+ Indian medical students.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#D9E2EC] shadow-2xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all" ? "bg-[#063280] text-white shadow-xs" : "text-[#475569] hover:text-[#063280]"
            }`}
          >
            All Life
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "academic" ? "bg-[#063280] text-white shadow-xs" : "text-[#475569] hover:text-[#063280]"
            }`}
          >
            Labs & Anatomy
          </button>
          <button
            onClick={() => setActiveTab("hospital")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "hospital" ? "bg-[#063280] text-white shadow-xs" : "text-[#475569] hover:text-[#063280]"
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => setActiveTab("life")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "life" ? "bg-[#063280] text-white shadow-xs" : "text-[#475569] hover:text-[#063280]"
            }`}
          >
            Hostel & Community
          </button>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((item) => (
          <div
            key={item.title}
            className="group bg-white rounded-3xl overflow-hidden border border-[#D9E2EC] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                aspectRatio="aspect-16/10"
                placeholderText={item.title}
                todoMarker={`TODO_REPLACE: Authentic photo for ${item.title}`}
              />
              <span className="absolute top-3 left-3 bg-[#063280]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {item.tag}
              </span>
            </div>

            <div className="p-5 space-y-1.5">
              <h3 className="font-extrabold text-sm text-[#063280] group-hover:text-[#1558A9] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudentLifeGallery;
