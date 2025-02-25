"use client";
import React from "react";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";

const Highlights = () => {
  const highlightsData = [
    {
      icon: "🎓",
      title: "शैक्षिक उत्कृष्टता",
      description:
        "नेपालको सबैभन्दा पुरानो र प्रतिष्ठित विश्वविद्यालयको रूपमा ६० वर्षभन्दा बढी अनुभव।",
    },
    {
      icon: "🔬",
      title: "अनुसन्धान र नवप्रवर्तन",
      description:
        "राष्ट्रिय र अन्तर्राष्ट्रिय स्तरमा मान्यताप्राप्त अनुसन्धान केन्द्रहरू र प्रयोगशालाहरू।",
    },
    {
      icon: "🌏",
      title: "वैश्विक सम्बन्ध",
      description:
        "विश्वभरका प्रतिष्ठित विश्वविद्यालयहरूसँग शैक्षिक साझेदारी र सहकार्य।",
    },
    {
      icon: "👨‍🎓",
      title: "विशाल विद्यार्थी समुदाय",
      description:
        "६ लाखभन्दा बढी विद्यार्थीहरू र १,१०० भन्दा बढी सम्बन्धित कलेजहरू।",
    },
  ];

  return (
    <div className="mb-8 py-10">
      <h1 className="text-2xl font-bold text-center mb-12 text-blue-900 pb-2 relative">
        हाम्रा विशेषताहरू
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500"></span>
      </h1>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200"></div>

        {highlightsData.map((highlight, index) => (
          <div key={index} className="relative mb-16 last:mb-0">
            <AnimatedElement variant="fadeIn">
              <div className="absolute left-8 top-6 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2 z-10 shadow-md"></div>
            </AnimatedElement>

            <AnimatedElement variant="slideLeft">
              <div className="ml-16 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{highlight.icon}</div>
                  <h3 className="text-xl font-bold text-blue-800">
                    {highlight.title}
                  </h3>
                </div>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            </AnimatedElement>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto bg-blue-100 p-6 rounded-lg text-center">
        <AnimatedElement>
          <h3 className="text-xl font-bold mb-3 text-blue-900">
            हाम्रो उद्देश्य
          </h3>
          <p className="text-gray-700">
            त्रिभुवन विश्वविद्यालयको प्रमुख उद्देश्य भनेको उच्च शिक्षाको 
            माध्यमबाट नेपाली समाजको आर्थिक, सामाजिक र सांस्कृतिक विकासमा योगदान
            पुर्‍याउनु हो। हामी राष्ट्रिय र अन्तर्राष्ट्रिय क्षेत्रमा
            प्रतिस्पर्धी हुन सक्ने दक्ष र उत्तरदायी नागरिकहरू तयार गर्न
            प्रतिबद्ध छौं।
          </p>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default Highlights;
