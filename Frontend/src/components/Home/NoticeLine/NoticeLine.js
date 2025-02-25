// "use client";
// import React, { useEffect, useState } from "react";
// import FetchNoticeLineData from "@/Helper/FetchNoticeLineData";
// import Marquee from "react-fast-marquee";

// export default function NoticeLine() {
//   const [NoticeLineData, setNoticeLineData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await FetchNoticeLineData();
//       if (res.success) {
//         setNoticeLineData(res.data);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="w-full p-1 h-6 shadow shadow-gray-900 drop-shadow-3xl  md:relative md:-top-0 md:bg-white backdrop-blur-2xl bg-opacity-50">
//       {NoticeLineData && (
//         <div className="w-full -mt-1">
//           <Marquee
//             behavior="scroll"
//             direction="left"
//             speed={50}
//             gradient={false}
//             className="flex items-center justify-center"
//             pauseOnHover
//           >
//             {NoticeLineData.map((notice, index) => (
//               <a
//                 key={index}
//                 href={notice.Link ?? "#"}
//                 className="whitespace-nowrap font-bold font-serif text-gray-800 hover:text-gray-900 focus:text-gray-900 no-underline px-4 -py-2"
//               >
//                 {notice.Title} |
//               </a>
//             ))}
//           </Marquee>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

// Notice Line Component with Nepali Content and Formal Styling
const NoticeLine = () => {
  const noticeLineData = [
    {
      "Title": "त्रिभुवन विश्वविद्यालयको वार्षिक दिवश प्रकाशनकालागि (त्रिवि वार्षिक दिवस प्रकाशन–२०८२) लेख/रचना उपलब्ध गराई दिने बारे ।",
      "Link": "/"
    },
    {
      "Title": "त्रिभुवन विश्वविद्यालय, स्वतन्त्र विद्यार्थी युनियन निर्वाचन २०८१, कार्यतालिका",
      "Link": "/"
    },
    {
      "Title": "त्रिभुवन विश्वविद्यालय जनशक्ति विकास तथा कल्याण कार्यक्रम अन्तर्गत (आ.व. २०८१।०८२) वृत्तिमा उच्च अध्ययनको लागि आवेदन आह्वानको सूचना",
      "Link": "/"
    },
    {
      "Title": "Minister of National Ethnic Affairs Commission of China Hon. Mr. PAN Yue Visited  Tribhuvan University",
      "Link": "/"
    },
    {
      "Title": "Academic Calendar for Bachelor’s Level Annual Program for Academic Year 2081",
      "Link": "/"
    },
    {
      "Title": "Minister of National Ethnic Affairs Commission of China Hon. Mr. PAN Yue Visited  Tribhuvan University",
      "Link": "/"
    }
  ];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % noticeLineData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [noticeLineData.length]);

  return (
    <div className="bg-blue-500 text-white p-3 mb-6 rounded shadow-md border-l-4 border-blue-800">
      <div className="flex items-center">
        <span className="font-bold mr-3 bg-white text-blue-500 px-2 py-1 rounded">सूचना:</span>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <a 
            href={noticeLineData[currentNoticeIndex].Link} 
            className="inline-block transition-all duration-1000 ease-in-out hover:underline"
          >
            {noticeLineData[currentNoticeIndex].Title}
          </a>
        </div>
        <div className="ml-4 flex space-x-2">
          <button 
            onClick={() => setCurrentNoticeIndex((prevIndex) => (prevIndex - 1 + noticeLineData.length) % noticeLineData.length)}
            className="text-white hover:text-yellow-300 focus:outline-none"
          >
            ◀
          </button>
          <button 
            onClick={() => setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % noticeLineData.length)}
            className="text-white hover:text-yellow-300 focus:outline-none"
          >
            ▶
          </button>
        </div>
      </div>
      {/* <div className="flex justify-center mt-2">
        {noticeLineData.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentNoticeIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${currentNoticeIndex === index ? 'bg-blue-900' : 'bg-white opacity-50'}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default NoticeLine;