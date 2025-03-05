"use client"
import { useState, useEffect, useRef } from "react"
import FetchNoticeLineData from "@/Helper/FetchNoticeLineData"

const NoticeLine = () => {
  const [noticeLineData, setNoticeLineData] = useState([])
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const noticeRef = useRef(null)
  const noticePositionRef = useRef(null)
  const navbarHeight = 60 // Adjust this to match your navbar height

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchNoticeLineData()
        if (res.success && res.data?.length) {
          setNoticeLineData(res.data)
        }
      } catch (error) {
        console.error("Failed to fetch notice data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!noticeLineData.length) return

    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % noticeLineData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [noticeLineData])

  useEffect(() => {
    // Store the original position of the notice line
    if (noticeRef.current && noticePositionRef.current === null) {
      noticePositionRef.current = noticeRef.current.getBoundingClientRect().top + window.scrollY
    }

    const handleScroll = () => {
      if (!noticeRef.current || noticePositionRef.current === null) return

      // Check if we've scrolled past the original position of the notice
      const scrollPosition = window.scrollY

      if (scrollPosition > noticePositionRef.current - navbarHeight) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        ref={noticeRef}
        className={`bg-blue-500 text-white p-3 mb-6 shadow-md border-l-4 border-blue-800 transition-all duration-300 z-40 ${
          isSticky ? "fixed top-[60px] left-0 w-full shadow-lg" : ""
        }`}
      >
        <div className="flex items-center">
          <span className="font-bold mr-3 bg-white text-blue-500 px-2 py-1 rounded">सूचना:</span>
          {noticeLineData.length > 0 && (
            <>
              <div className="overflow-hidden whitespace-nowrap flex-1">
                <a
                  href={noticeLineData[currentNoticeIndex].Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all duration-1000 ease-in-out hover:underline"
                >
                  {noticeLineData[currentNoticeIndex].Title}
                </a>
              </div>
              <div className="ml-4 flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentNoticeIndex(
                      (prevIndex) => (prevIndex - 1 + noticeLineData.length) % noticeLineData.length,
                    )
                  }
                  className="text-white hover:text-yellow-300 focus:outline-none"
                  aria-label="Previous notice"
                >
                  ◀
                </button>
                <button
                  onClick={() => setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % noticeLineData.length)}
                  className="text-white hover:text-yellow-300 focus:outline-none"
                  aria-label="Next notice"
                >
                  ▶
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Add placeholder div to prevent content jump when notice becomes sticky */}
      {isSticky && <div className="h-[54px] mb-6"></div>}
    </>
  )
}

export default NoticeLine

