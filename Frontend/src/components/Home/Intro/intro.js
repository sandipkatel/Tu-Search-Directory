// "use client";
// import React from "react";
// import Image from "next/image";
// import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
// import "./Message.styles.css";

// export default function IntroToTU() {
//   return (
//     <div className="py-16 px-4 relative overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center gap-12">
//           {/* Image Section */}
//           <div className="relative rounded-xl">
//             <AnimatedElement>
//               <div className="relative w-64 h-64 rounded-xl md:w-80 md:h-80">
//                 {/* Modern Image Container */}
//                 <div className="absolute inset-0 p-1.5">
//                   <div className="w-full h-full rounded-xl overflow-hidden">
//                     <Image
//                       src="/images/about.png"
//                       width={300}
//                       height={300}
//                       alt="Tribhuvan University Emblem"
//                       className="w-full h-full object-cover transition-all duration-300 rounded-xl cursor-pointer filter grayscale hover:grayscale-0"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </AnimatedElement>
//           </div>

//           {/* Intro Section */}
//           <div className="flex-1 text-center md:text-left">
//             <AnimatedElement>
//               <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
//                 Who are we?
//               </h2>
//               <p className="text-lg text-gray-700 font-serif dark:text-gray-300 mb-6 leading-relaxed">
//                 “Established in 1959, Tribhuvan University stands as Nepal’s
//                 oldest and most prestigious institution of higher education.
//                 With a rich legacy of academic excellence, we are committed to
//                 fostering innovation, research, and holistic development. Our
//                 diverse community of students, faculty, and alumni continues to
//                 shape the future of Nepal and beyond, driven by a shared vision
//                 of knowledge, integrity, and progress.”
//               </p>
//               <div className="flex flex-col">
//                 <span className="text-xl font-semibold text-blue-600">
//                   A Legacy of Excellence
//                 </span>
//                 <span className="text-gray-600 dark:text-gray-400">
//                   Over six decades of shaping minds and transforming lives
//                 </span>
//                 <span className="text-sm text-gray-500 mt-2">
//                   Home to over 600,000 students and 1,000+ affiliated colleges
//                 </span>
//               </div>
//             </AnimatedElement>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import Image from "next/image";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import "./Message.styles.css";

export default function IntroToTU() {
  return (
    <div className="py-12 px-4 relative overflow-hidden bg-white rounded-lg shadow-md mb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="relative rounded-xl">
            <AnimatedElement>
              <div className="relative w-64 h-64 rounded-xl md:w-80 md:h-80">
                {/* Modern Image Container with indigo border to match theme */}
                <div className="absolute inset-0 p-1.5 border-4 border-blue-500 rounded-xl">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/about.png"
                      width={300}
                      height={300}
                      alt="त्रिभुवन विश्वविद्यालयको प्रतीक चिन्ह"
                      className="w-full h-full object-cover transition-all duration-300 rounded-xl cursor-pointer filter grayscale hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* Intro Section in Nepali */}
          <div className="flex-1 text-center md:text-left">
            <AnimatedElement>
              <h2 className="text-3xl font-bold text-blue-500 mb-4">
                हामी को हौं?
              </h2>
              <p className="text-lg text-gray-700 font-serif mb-6 leading-relaxed">
                "सन् १९५९ मा स्थापित, त्रिभुवन विश्वविद्यालय नेपालको सबैभन्दा पुरानो र प्रतिष्ठित उच्च शिक्षा संस्था हो। 
                शैक्षिक उत्कृष्टताको समृद्ध परम्परासहित, हामी नवप्रवर्तन, अनुसन्धान र समग्र विकासलाई प्रोत्साहित गर्न प्रतिबद्ध छौं। 
                हाम्रो विद्यार्थी, शिक्षक र पूर्व विद्यार्थीहरूको विविध समुदायले ज्ञान, सत्यनिष्ठा र प्रगतिको साझा दृष्टिकोणद्वारा प्रेरित भएर 
                नेपाल र विश्वको भविष्य निर्माण गर्दै आइरहेको छ।"
              </p>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-blue-500">
                  उत्कृष्टताको विरासत
                </span>
                <span className="text-gray-600">
                  ६० वर्षभन्दा बढी समयदेखि बौद्धिक विकास र जीवन परिवर्तन गर्दै
                </span>
                <span className="text-sm text-gray-500 mt-2">
                  ६ लाखभन्दा बढी विद्यार्थी र १,१०० भन्दा बढी सम्बन्धित कलेजहरू
                </span>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </div>
  );
}