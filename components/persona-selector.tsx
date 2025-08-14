"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles } from "lucide-react"

const personas = [
  {
    id: "hitesh-sir",
    name: "Hitesh Sir",
    description:
      "Experienced educator and mentor specializing in web development, JavaScript, and modern frameworks. Known for clear explanations and practical teaching approach.",
    icon: "👨‍🏫",
    tags: ["Educator", "Web Development", "JavaScript", "Mentor"],
  },
  {
    id: "piyush-sir",
    name: "Piyush Sir",
    description:
      "Tech entrepreneur and coding instructor with expertise in full-stack development, system design, and career guidance. Focuses on industry best practices and professional growth.",
    icon: "👨‍💻",
    tags: ["Entrepreneur", "Full-Stack", "System Design", "Career Guide"],
  },
]

interface PersonaSelectorProps {
  selectedPersona: string | null
  onSelectPersona: (persona: string) => void
}

export function PersonaSelector({ selectedPersona, onSelectPersona }: PersonaSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-tangerine-500/5 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-tangerine-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-tangerine-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tangerine-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-tangerine-500/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-tangerine-500/20">
              <Sparkles className="w-4 h-4 text-tangerine-500" />
              <span className="text-tangerine-600 dark:text-tangerine-400 font-medium">
                AI-Powered Learning Experience
              </span>
            </div>
            <h1 className="text-6xl font-bold font-serif mb-6">
              Learn from the
              <br />
              <span className="bg-gradient-to-r from-tangerine-600 via-tangerine-500 to-tangerine-400 bg-clip-text text-transparent">
                Best Mentors
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get personalized guidance from experienced educators who understand your learning journey. Choose your
              mentor and start an intelligent conversation.
            </p>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground/80">
              Select an expert AI mentor to guide your learning journey with personalized insights and industry
              expertise
            </p>
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
                  onClick={() => onSelectPersona(persona.name)}
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

                    {isSelected && (
                      <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-tangerine-500 to-tangerine-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-tangerine-500 to-tangerine-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-tangerine-600 hover:to-tangerine-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedPersona}
              onClick={() => selectedPersona && onSelectPersona(selectedPersona)}
            >
              <Sparkles className="w-5 h-5" />
              Start Learning Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
