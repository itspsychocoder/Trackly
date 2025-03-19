import { Search, Plus, Filter } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ProjectShowcase() {
  return (
    <div className="min-h-screen bg-[#09090b] text-primary-foreground">
    

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Projects</h2>
            <p className="text-primary-foreground/60">Manage and track all your team projects</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:max-w-xs">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/40"
                size={18}
              />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground gap-2">
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Projects</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>On Hold</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
              <Plus size={16} />
              <span>New Project</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  )
}

function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "On Hold":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "At Risk":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <Card className="bg-primary-foreground/5 border-primary-foreground/10 overflow-hidden hover:border-secondary/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-white text-lg">{project.name}</h3>
            <p className="text-primary-foreground/60 text-sm mt-1">{project.description}</p>
          </div>
          <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-primary-foreground/60">Progress</span>
            <span className="text-xs font-medium text-primary-foreground/60">{project.progress}%</span>
          </div>
          <Progress
            value={project.progress}
            className="h-1.5 bg-primary"
            indicatorClassName="bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-primary-foreground/5 p-3 rounded-md">
            <div className="text-xs text-primary-foreground/60 mb-1">Tasks</div>
            <div className="text-lg text-white font-semibold">
              {project.tasks.completed}/{project.tasks.total}
            </div>
          </div>
          <div className="bg-primary-foreground/5 p-3 rounded-md">
            <div className="text-xs text-primary-foreground/60 mb-1">Due Date</div>
            <div className="text-white text-sm font-medium">{project.dueDate}</div>
          </div>
        </div>

        <div>
          <div className="text-xs text-primary-foreground/60 mb-2">Team</div>
          <div className="flex -space-x-2">
            {project.team.map((member, index) => (
              <Avatar key={index} className="border-2 border-primary w-8 h-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-xs font-medium border-2 border-primary">
                +{project.team.length - 4}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-primary-foreground/10 pt-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-accent text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-square"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{project.comments}</span>
            </div>
            <div className="flex items-center gap-1 text-primary-foreground/60 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-paperclip"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <span>{project.attachments}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Sample project data
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesigning the company website with new branding",
    status: "Active",
    progress: 65,
    tasks: { completed: 24, total: 36 },
    dueDate: "Oct 15, 2023",
    team: [
      { name: "John Doe", initials: "JD", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Smith", initials: "SS", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Johnson", initials: "MJ", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Emily Brown", initials: "EB", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Alex Wilson", initials: "AW", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    comments: 12,
    attachments: 5,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Building a new mobile app for customer engagement",
    status: "At Risk",
    progress: 42,
    tasks: { completed: 18, total: 50 },
    dueDate: "Nov 30, 2023",
    team: [
      { name: "Lisa Chen", initials: "LC", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David Kim", initials: "DK", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Rachel Green", initials: "RG", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    comments: 28,
    attachments: 12,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 product launch marketing campaign",
    status: "On Hold",
    progress: 30,
    tasks: { completed: 6, total: 20 },
    dueDate: "Dec 10, 2023",
    team: [
      { name: "Tom Harris", initials: "TH", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Jessica Lee", initials: "JL", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Kevin Park", initials: "KP", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Amanda Cruz", initials: "AC", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    comments: 8,
    attachments: 3,
  },
  {
    id: 4,
    name: "CRM Integration",
    description: "Integrating new CRM system with existing tools",
    status: "Completed",
    progress: 100,
    tasks: { completed: 32, total: 32 },
    dueDate: "Sep 5, 2023",
    team: [
      { name: "Ryan Miller", initials: "RM", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sophia Wang", initials: "SW", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    comments: 15,
    attachments: 7,
  },
  {
    id: 5,
    name: "Product Analytics",
    description: "Setting up analytics dashboard for product metrics",
    status: "Active",
    progress: 78,
    tasks: { completed: 14, total: 18 },
    dueDate: "Oct 22, 2023",
    team: [
      { name: "Daniel Jackson", initials: "DJ", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Olivia Martinez", initials: "OM", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Wilson", initials: "JW", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    comments: 6,
    attachments: 4,
  },
  {
    id: 6,
    name: "User Research",
    description: "Conducting user interviews and usability testing",
    status: "Active",
    progress: 50,
    tasks: { completed: 10, total: 20 },
    dueDate: "Nov 15, 2023",
    team: [
      { name: "Emma Thompson", initials: "ET", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Noah Garcia", initials: "NG", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Ava Robinson", initials: "AR", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Liam Davis", initials: "LD", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mia Johnson", initials: "MJ", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Ethan Brown", initials: "EB", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    comments: 22,
    attachments: 9,
  },
]

