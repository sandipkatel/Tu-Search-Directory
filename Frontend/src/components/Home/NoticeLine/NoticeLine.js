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

"use client";
import React, { useState, useEffect } from "react";
import FetchNoticeLineData from "@/Helper/FetchNoticeLineData";

const NoticeLine = () => {
  const [noticeLineData, setNoticeLineData] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchNoticeLineData();
        if (res.success && res.data?.length) {
          setNoticeLineData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch notice data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!noticeLineData.length) return;

    const interval = setInterval(() => {
      setCurrentNoticeIndex(
        (prevIndex) => (prevIndex + 1) % noticeLineData.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [noticeLineData]);

  return (
    <div className="bg-blue-500 text-white p-3 mb-6 rounded shadow-md border-l-4 border-blue-800 z-40">
      <div className="flex items-center">
        <span className="font-bold mr-3 bg-white text-blue-500 px-2 py-1 rounded">
          सूचना:
        </span>
        {noticeLineData.length && (
          <>
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <a
                href={noticeLineData[currentNoticeIndex].Link}
                target="_blank"
                className="inline-block transition-all duration-1000 ease-in-out hover:underline"
              >
                {noticeLineData[currentNoticeIndex].Title}
              </a>
            </div>
            <div className="ml-4 flex space-x-2">
              <button
                onClick={() =>
                  setCurrentNoticeIndex(
                    (prevIndex) =>
                      (prevIndex - 1 + NoticeLineData.length) %
                      noticeLineData.length
                  )
                }
                className="text-white hover:text-yellow-300 focus:outline-none"
              >
                ◀
              </button>
              <button
                onClick={() =>
                  setCurrentNoticeIndex(
                    (prevIndex) => (prevIndex + 1) % noticeLineData.length
                  )
                }
                className="text-white hover:text-yellow-300 focus:outline-none"
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeLine;
