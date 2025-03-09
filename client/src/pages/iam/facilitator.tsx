"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Grid,
  LayoutGrid,
  Rows,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ChevronDown,
  FileText,
  BarChart,
  Calendar,
  ClipboardEdit,
  Building2,
  FileBarChart,
  Building,
} from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Import your images
import pic1 from "../../assets/1.jpg"
import pic2 from "../../assets/2.jpg"
import pic3 from "../../assets/3.jpg"
import pic4 from "../../assets/4.jpg"
import pic5 from "../../assets/5.jpg"
import pic6 from "../../assets/6.jpg"
import pic7 from "../../assets/7.jpg"
import pic8 from "../../assets/8.jpg"
import pic9 from "../../assets/9.jpg"
import pic10 from "../../assets/10.jfif"
import pic11 from "../../assets/11.jpg"
import pic12 from "../../assets/12.jpg"
import pic13 from "../../assets/13.jpg"
import pic14 from "../../assets/14.jpg"
import pic15 from "../../assets/15.jpg"
import pic16 from "../../assets/16.jpg"
import WorkshopDataTable from "../../components/workshop-data-table"

const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16]

// Workshop submenu options
const workshopOptions = [
  { id: "request", label: "Request a Workshop", icon: ClipboardEdit },
  { id: "report", label: "Report a Workshop", icon: FileText },
  { id: "summary", label: "Workshop Data Summary", icon: BarChart },
]

// Workshop data years
const workshopYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018]

// Nodal Center submenu options
const nodalOptions = [
  { id: "become", label: "Become a Nodal Center", icon: Building },
  { id: "summary", label: "Data Summary", icon: FileBarChart },
  { id: "data", label: "NC Data 2014-2023", icon: Building2 },
]

export default function Outreach() {
  const [selectedView, setSelectedView] = useState("masonry")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("gallery")
  const [activeWorkshopOption, setActiveWorkshopOption] = useState<string | null>(null)
  const [activeNodalOption, setActiveNodalOption] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // Shuffle images for the shuffle view
  const [shuffledImages, setShuffledImages] = useState([...images])

  const shuffleImages = () => {
    setShuffledImages([...images].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    shuffleImages()
  }, [])

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateLightbox = (direction: number) => {
    if (selectedImage === null) return

    const newIndex = (selectedImage + direction + images.length) % images.length
    setSelectedImage(newIndex)
  }

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigateLightbox(-1)
      if (e.key === "ArrowRight") navigateLightbox(1)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, selectedImage])

  // Handle workshop option selection
  const handleWorkshopOptionSelect = (optionId: string) => {
    setActiveWorkshopOption(optionId)
    setActiveTab("workshops")
  }

  // Handle workshop year selection
  const handleWorkshopYearSelect = (year: number) => {
    setActiveWorkshopOption(`data-${year}`)
    setActiveTab("workshops")
  }

  // Handle nodal center option selection
  const handleNodalOptionSelect = (optionId: string) => {
    setActiveNodalOption(optionId)
    setActiveTab("nodal")
  }

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background pattern - keep existing */}

      <div className="container mx-auto px-2 py-6">
        {/* Hero section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-primary via-primary/80 to-primary/60 
              dark:from-white dark:to-white/60 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Outreach
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore our community engagement and collaborative initiatives
          </motion.p>
        </motion.div>

        {/* Custom Tabs Navigation with Hover Menu for Workshops */}
        <div className="w-full max-w-5xl mx-auto mb-8">
          <div className="flex justify-center border-b">
            <Button
              variant={activeTab === "gallery" ? "default" : "ghost"}
              className={`rounded-none px-4 py-2 h-auto ${activeTab === "gallery" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </Button>

            {/* Workshops with HoverCard */}
            <HoverCard openDelay={100} closeDelay={200}>
              <HoverCardTrigger asChild>
                <Button
                  variant={activeTab === "workshops" ? "default" : "ghost"}
                  className={`rounded-none px-4 py-2 h-auto flex items-center gap-1 ${activeTab === "workshops" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("workshops")}
                >
                  Workshops
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-0" align="center">
                <div className="grid gap-1 p-2">
                  {workshopOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      className="w-full justify-start gap-2 rounded-sm px-2 py-1.5 text-sm"
                      onClick={() => handleWorkshopOptionSelect(option.id)}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </Button>
                  ))}

                  <div className="px-2 py-1.5 text-sm font-medium">Workshop Data</div>
                  <div className="grid grid-cols-3 gap-1">
                    {workshopYears.map((year) => (
                      <Button
                        key={year}
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handleWorkshopYearSelect(year)}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={100} closeDelay={200}>
              <HoverCardTrigger asChild>
                <Button
                  variant={activeTab === "nodal" ? "default" : "ghost"}
                  className={`rounded-none px-4 py-2 h-auto flex items-center gap-1 ${activeTab === "nodal" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("nodal")}
                >
                  Nodal Centers
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 p-0" align="center">
                <div className="grid gap-1 p-2">
                  {nodalOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      className="w-full justify-start gap-2 rounded-sm px-2 py-1.5 text-sm"
                      onClick={() => handleNodalOptionSelect(option.id)}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>

            <Button
              variant={activeTab === "faq" ? "default" : "ghost"}
              className={`rounded-none px-4 py-2 h-auto ${activeTab === "faq" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              FAQ
            </Button>

            <Button
              variant={activeTab === "testimonials" ? "default" : "ghost"}
              className={`rounded-none px-4 py-2 h-auto ${activeTab === "testimonials" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("testimonials")}
            >
              Testimonials
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-5xl mx-auto">
          {activeTab === "gallery" && (
            <div>
              {/* Existing gallery controls and view options */}
              <motion.div className="mb-8 flex justify-center">
                <Tabs defaultValue={selectedView} value={selectedView} onValueChange={setSelectedView}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="masonry" className="flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="hidden sm:inline">Masonry</span>
                    </TabsTrigger>
                    <TabsTrigger value="grid" className="flex items-center gap-2">
                      <Grid className="h-4 w-4" />
                      <span className="hidden sm:inline">Grid</span>
                    </TabsTrigger>
                    <TabsTrigger value="rows" className="flex items-center gap-2">
                      <Rows className="h-4 w-4" />
                      <span className="hidden sm:inline">Rows</span>
                    </TabsTrigger>
                    <TabsTrigger value="shuffle" className="flex items-center gap-2">
                      <Shuffle className="h-4 w-4" />
                      <span className="hidden sm:inline">Shuffle</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </motion.div>

              {selectedView === "shuffle" && (
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button onClick={shuffleImages} variant="outline" className="flex items-center gap-2">
                    <Shuffle className="h-4 w-4" />
                    Shuffle Images
                  </Button>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedView}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity, y }}
                >
                  {selectedView === "masonry" && (
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                      {images.map((pic, index) => (
                        <motion.div
                          key={index}
                          className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          whileHover={{ scale: 0.98 }}
                          onClick={() => openLightbox(index)}
                        >
                          <div className="relative overflow-hidden">
                            <motion.img
                              src={pic}
                              alt={`Outreach activity ${index + 1}`}
                              className="w-full h-auto object-cover"
                              loading="lazy"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <Maximize2 className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {selectedView === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((pic, index) => (
                        <motion.div
                          key={index}
                          className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.03 }}
                          whileHover={{
                            scale: 0.95,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                          onClick={() => openLightbox(index)}
                        >
                          <motion.img
                            src={pic}
                            alt={`Outreach activity ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                            whileHover={{ opacity: 1 }}
                          >
                            <Maximize2 className="text-white h-8 w-8" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {selectedView === "rows" && (
                    <div className="space-y-16">
                      {Array.from({ length: Math.ceil(images.length / 4) }).map((_, rowIndex) => (
                        <motion.div
                          key={rowIndex}
                          className="flex flex-col md:flex-row gap-4 items-center"
                          initial={{ opacity: 0, x: rowIndex % 2 === 0 ? -50 : 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.7, delay: rowIndex * 0.2 }}
                        >
                          {images.slice(rowIndex * 4, rowIndex * 4 + 4).map((pic, index) => (
                            <motion.div
                              key={index}
                              className="relative group cursor-pointer overflow-hidden rounded-xl w-full md:w-1/4 aspect-video"
                              whileHover={{ scale: 1.02, rotate: 1 }}
                              transition={{ duration: 0.3 }}
                              onClick={() => openLightbox(rowIndex * 4 + index)}
                            >
                              <motion.img
                                src={pic}
                                alt={`Outreach activity ${rowIndex * 4 + index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <Maximize2 className="text-white h-8 w-8" />
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {selectedView === "shuffle" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {shuffledImages.map((pic, index) => (
                        <motion.div
                          key={index}
                          className="relative group cursor-pointer overflow-hidden rounded-xl"
                          initial={{ opacity: 0, rotate: Math.random() * 10 - 5, scale: 0.9 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.04,
                            type: "spring",
                            stiffness: 100,
                          }}
                          whileHover={{
                            scale: 1.05,
                            rotate: Math.random() * 4 - 2,
                            zIndex: 10,
                          }}
                          onClick={() => openLightbox(images.indexOf(pic))}
                        >
                          <div className="aspect-square">
                            <motion.img
                              src={pic}
                              alt={`Outreach activity ${index + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <Maximize2 className="text-white h-8 w-8" />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {activeTab === "workshops" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkshopOption || "workshops-main"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                {!activeWorkshopOption && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Main workshop options */}
                    {workshopOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        whileHover={{ y: -5 }}
                        onClick={() => handleWorkshopOptionSelect(option.id)}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <option.icon className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-medium text-lg">{option.label}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {option.id === "request" && "Submit a request for a new workshop in your area."}
                            {option.id === "report" && "Report details about a completed workshop."}
                            {option.id === "summary" && "View comprehensive data about all workshops."}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Workshop data years */}
                    <motion.div
                      className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow md:col-span-2 lg:col-span-3"
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="font-medium text-lg">Workshop Data by Year</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                          {workshopYears.map((year) => (
                            <Button
                              key={year}
                              variant="outline"
                              className="h-12"
                              onClick={() => handleWorkshopYearSelect(year)}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              {year}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {activeWorkshopOption === "request" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveWorkshopOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">Request a Workshop</h2>
                    </div>
                    <p className="text-muted-foreground">Fill out the form below to request a workshop in your area.</p>
                    {/* Workshop request form would go here */}
                    <div className="p-8 text-center text-muted-foreground">Workshop request form placeholder</div>
                  </div>
                )}

                {activeWorkshopOption === "report" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveWorkshopOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">Report a Workshop</h2>
                    </div>
                    <p className="text-muted-foreground">Submit details about a completed workshop.</p>
                    {/* Workshop report form would go here */}
                    <div className="p-8 text-center text-muted-foreground">Workshop report form placeholder</div>
                  </div>
                )}

                {activeWorkshopOption === "summary" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveWorkshopOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">Workshop Data Summary</h2>
                    </div>
                    <p className="text-muted-foreground">Comprehensive data about all workshops.</p>
                    {/* Workshop summary data would go here */}
                    <div className="p-8 text-center text-muted-foreground">Workshop data summary placeholder</div>
                  </div>
                )}

                {activeWorkshopOption?.startsWith("data-") && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveWorkshopOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">
                        Workshop Data {activeWorkshopOption.replace("data-", "")}
                      </h2>
                    </div>
                    <WorkshopDataTable year={parseInt(activeWorkshopOption.replace("data-", ""))} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {activeTab === "nodal" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNodalOption || "nodal-main"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                {!activeNodalOption && (
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Main nodal center options */}
                    {nodalOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        whileHover={{ y: -5 }}
                        onClick={() => handleNodalOptionSelect(option.id)}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <option.icon className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-medium text-lg">{option.label}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {option.id === "become" && "Learn how to establish a Nodal Center in your region."}
                            {option.id === "summary" && "View comprehensive statistics about our Nodal Centers."}
                            {option.id === "data" && "Access historical data for Nodal Centers from 2014-2023."}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeNodalOption === "become" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveNodalOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">Become a Nodal Center</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Learn about the process and requirements to establish a Nodal Center in your region.
                    </p>
                    {/* Nodal center application information would go here */}
                    <div className="p-8 text-center text-muted-foreground">
                      Nodal Center application information placeholder
                    </div>
                  </div>
                )}

                {activeNodalOption === "summary" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveNodalOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">Nodal Centers Data Summary</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Comprehensive statistics and information about our Nodal Centers network.
                    </p>
                    {/* Nodal center data summary would go here */}
                    <div className="p-8 text-center text-muted-foreground">Nodal Centers data summary placeholder</div>
                  </div>
                )}

                {activeNodalOption === "data" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveNodalOption(null)}>
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-semibold">Nodal Centers Data 2014-2023</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Historical data and statistics for Nodal Centers from 2014 to 2023.
                    </p>
                    {/* Historical nodal center data would go here */}
                    <div className="p-8 text-center text-muted-foreground">
                      Nodal Centers historical data (2014-2023) placeholder
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {activeTab === "faq" && <div className="p-8 text-center text-muted-foreground">FAQ content placeholder</div>}

          {activeTab === "testimonials" && (
            <div className="p-8 text-center text-muted-foreground">Testimonials content placeholder</div>
          )}
        </div>
      </div>

      {/* Lightbox - keep existing */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={images[selectedImage]}
                alt={`Outreach activity ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/40 rounded-full"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox(-1)
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox(1)
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

