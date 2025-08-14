"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, MessageSquare, Zap } from "lucide-react"

const personas = [
  {
    id: "hitesh-sir",
    name: "Hitesh Sir",
    description:
      "Experienced educator and mentor specializing in web development, JavaScript, and modern frameworks. Known for clear explanations and practical teaching approach.",
    image: "/hitesh.jpeg",
    icon: "👨‍🏫",
    tags: ["Educator", "Web Development", "JavaScript", "Mentor"],
  },
  {
    id: "piyush-sir",
    name: "Piyush Sir",
    description:
      "Tech entrepreneur and coding instructor with expertise in full-stack development, system design, and career guidance. Focuses on industry best practices and professional growth.",
    image: "/piyush.jpeg",
    icon: "👨‍💻",
    tags: ["Entrepreneur", "Full-Stack", "System Design", "Career Guide"],
  },
]

export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleStartChat = () => {
    if (selectedPersona) {
      setShowChat(true)
    }
  }

  if (showChat && selectedPersona) {
    return <ChatInterface persona={selectedPersona} onBack={() => setShowChat(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-tangerine-500/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-tangerine-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-tangerine-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tangerine-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-tangerine-500 to-tangerine-600 rounded-xl flex items-center justify-center shadow-lg shadow-tangerine-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif bg-gradient-to-r from-tangerine-600 to-tangerine-500 bg-clip-text text-transparent">
                Persona AI
              </h1>
              <p className="text-xs text-muted-foreground">Chat with AI Mentors</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tangerine-500/10 border border-tangerine-500/20 text-tangerine-600 dark:text-tangerine-400 font-medium text-sm mb-4 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              AI-Powered Persona Chat Experience
            </div>

            <h2 className="text-5xl md:text-6xl font-bold font-serif leading-tight">
              Chat with
              <span className="block bg-gradient-to-r from-tangerine-600 via-tangerine-500 to-tangerine-400 bg-clip-text text-transparent">
                Best Mentors
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get personalized guidance from experienced educators who understand your learning journey. 
            </p>
          </div>

          {/* Persona Selection */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground/90">
                Select the mentor to guide your learning journey with personalized insights and industry
                expertise
              </p>
              <br />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {personas.map((persona, index) => {
                const isSelected = selectedPersona === persona.name

                return (
                  <Card
                    key={persona.id}
                    className={`p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl animate-in slide-in-from-bottom-4 relative overflow-hidden group backdrop-blur-sm ${
                      isSelected
                        ? "ring-2 ring-tangerine-500 bg-gradient-to-br from-tangerine-500/20 via-tangerine-500/10 to-tangerine-500/5 shadow-2xl shadow-tangerine-500/30 scale-105 border-2 border-tangerine-500"
                        : "hover:bg-gradient-to-br hover:from-tangerine-500/10 hover:to-tangerine-500/5 shadow-lg hover:scale-105 bg-card/80 hover:ring-1 hover:ring-tangerine-500/30 border border-border"
                    }`}
                    onClick={() => setSelectedPersona(persona.name)}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isSelected
                          ? "bg-gradient-to-br from-tangerine-500/15 via-tangerine-500/8 to-tangerine-500/5 opacity-100"
                          : "bg-gradient-to-br from-transparent via-tangerine-500/5 to-tangerine-500/10 opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start gap-6 mb-6">
                        <Avatar
                          className={`w-20 h-20 ring-2 transition-all duration-300 group-hover:scale-110 ${
                            isSelected
                              ? "ring-tangerine-500/60 shadow-lg shadow-tangerine-500/30"
                              : "ring-tangerine-500/30 group-hover:ring-tangerine-500/60"
                          }`}
                        >
                          <AvatarImage src={persona.image} alt={persona.name} />
                          <AvatarFallback className="bg-gradient-to-br from-tangerine-500 to-tangerine-600 text-white text-3xl shadow-lg">
                            {persona.icon}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <h3
                              className={`font-bold text-3xl font-serif transition-colors duration-300 ${
                                isSelected
                                  ? "text-tangerine-600 dark:text-tangerine-400"
                                  : "text-foreground group-hover:text-tangerine-600 dark:group-hover:text-tangerine-400"
                              }`}
                            >
                              {persona.name}
                            </h3>
                            <Sparkles
                              className={`w-6 h-6 transition-colors duration-300 ${
                                isSelected
                                  ? "text-tangerine-500 animate-pulse"
                                  : "text-tangerine-500/70 group-hover:text-tangerine-500 group-hover:animate-pulse"
                              }`}
                            />
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-lg">{persona.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {persona.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={`text-sm px-4 py-2 transition-all duration-300 hover:scale-105 border font-medium ${
                              isSelected
                                ? "bg-tangerine-500/30 text-tangerine-700 dark:text-tangerine-300 border-tangerine-500/50"
                                : "bg-tangerine-500/20 text-tangerine-700 dark:text-tangerine-300 hover:bg-tangerine-500/30 border-tangerine-500/30"
                            }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Start Chat Button */}
          <div className="text-center">
            <Button
              onClick={handleStartChat}
              disabled={!selectedPersona}
              size="lg"
              className="bg-gradient-to-r from-tangerine-500 to-tangerine-600 hover:from-tangerine-600 hover:to-tangerine-700 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-tangerine-500/25 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Learning Session
            </Button>
            {selectedPersona && (
              <p className="text-sm text-muted-foreground mt-3">
                Ready to chat with{" "}
                <span className="text-tangerine-600 dark:text-tangerine-400 font-medium">{selectedPersona}</span>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
