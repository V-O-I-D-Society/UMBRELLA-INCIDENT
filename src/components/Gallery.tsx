import React from "react";

import { Eye } from "lucide-react";

const Gallery: React.FC = () => {
  const galleryImages = [
    { id: 1, label: "SECTOR-7 BREACH", status: "CONTAINED" },
    { id: 2, label: "T-VIRUS SAMPLE", status: "SECURED" },
    { id: 3, label: "COMBAT ZONE", status: "ACTIVE" },
    { id: 4, label: "RESEARCH LAB", status: "QUARANTINED" },
    { id: 5, label: "EXTRACTION POINT", status: "CLEAR" },
    { id: 6, label: "BIOHAZARD DETECTED", status: "CRITICAL" },
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-12 text-white">
          SURVEILLANCE <span className="text-red-400">FEED</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded border border-gray-600 bg-gray-800">
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={image.label}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Surveillance UI */}
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-mono text-xs">LIVE</span>
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/80 rounded p-2">
                    <p className="text-white font-mono text-xs">
                      {image.label}
                    </p>
                    <p
                      className={`font-mono text-xs ${
                        image.status === "CRITICAL"
                          ? "text-red-400"
                          : image.status === "ACTIVE"
                          ? "text-yellow-400"
                          : image.status === "SECURED"
                          ? "text-blue-400"
                          : "text-green-400"
                      }`}
                    >
                      STATUS: {image.status}
                    </p>
                  </div>
                </div>

                {/* Glitch effect */}
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
