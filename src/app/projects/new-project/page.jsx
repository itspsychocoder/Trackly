"use client"
import { useState } from "react"
import { ArrowLeft, Calendar, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function NewProject() {
  const router = useRouter()
  const [startDate, setStartDate] = useState()
  const [dueDate, setDueDate] = useState()
  const [selectedTechStack, setSelectedTechStack] = useState([])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([])

  const handleAddTech = (tech) => {
    if (!selectedTechStack.includes(tech) && tech.trim() !== "") {
      setSelectedTechStack([...selectedTechStack, tech])
    }
  }

  const handleRemoveTech = (tech) => {
    setSelectedTechStack(selectedTechStack.filter((t) => t !== tech))
  }

  const handleToggleTeamMember = (id) => {
    if (selectedTeamMembers.includes(id)) {
      setSelectedTeamMembers(selectedTeamMembers.filter((memberId) => memberId !== id))
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, id])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the form submission
    // For now, we'll just navigate back to the projects page
    router.push("/")
  }

  const formatDate = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300">


      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Create New Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Basic Information</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Project Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[120px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-slate-300"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? formatDate(startDate) : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-900 border-white/10">
                      <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-slate-300"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dueDate ? formatDate(dueDate) : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-900 border-white/10">
                      <CalendarComponent mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </section>

          {/* Project Icon */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Project Icon</h2>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <div>
                <Button type="button" className="bg-secondary hover:bg-secondary/90 text-white mb-2">
                  Upload Icon
                </Button>
                <p className="text-xs text-slate-400">Recommended size: 512x512px. PNG or JPG.</p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Tech Stack</h2>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTechStack.map((tech) => (
                  <Badge
                    key={tech}
                    className="hover:bg-accent/90 text-white flex items-center gap-1 px-3 py-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={14} />
                      <span className="sr-only">Remove {tech}</span>
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  id="tech-stack"
                  placeholder="Add technologies (e.g., React, Node.js)"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const input = e.currentTarget
                      handleAddTech(input.value)
                      input.value = ""
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/10 text-white"
                  onClick={() => {
                    const input = document.getElementById("tech-stack")
                    handleAddTech(input.value)
                    input.value = ""
                  }}
                >
                  <Plus size={16} />
                  <span className="sr-only">Add</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                {commonTechnologies.map((tech) => (
                  <Button
                    key={tech}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={`border-white/10 ${selectedTechStack.includes(tech) ? "bg-accent text-black" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
                    onClick={() => {
                      if (selectedTechStack.includes(tech)) {
                        handleRemoveTech(tech)
                      } else {
                        handleAddTech(tech)
                      }
                    }}
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Project Details */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Project Details</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Priority</Label>
                <RadioGroup defaultValue="medium" className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="priority-low" value="low" className="text-green-500" />
                    <Label htmlFor="priority-low" className="cursor-pointer">
                      Low
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="priority-medium" value="medium" className="text-amber-500" />
                    <Label htmlFor="priority-medium" className="cursor-pointer">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="priority-high" value="high" className="text-red-500" />
                    <Label htmlFor="priority-high" className="cursor-pointer">
                      High
                    </Label>
                  </div>
                </RadioGroup>
              </div>

            
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-secondary">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
           
            <Button type="submit">
              Create Project
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

// Sample data
const commonTechnologies = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Laravel",
  "Spring Boot",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
]

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    initials: "JD",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "UI/UX Designer",
    initials: "SS",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Backend Developer",
    initials: "MJ",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Project Manager",
    initials: "EB",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Alex Wilson",
    role: "DevOps Engineer",
    initials: "AW",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Lisa Chen",
    role: "QA Engineer",
    initials: "LC",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

