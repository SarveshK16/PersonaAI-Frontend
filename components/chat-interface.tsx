"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePersonas } from "@/hooks/use-personas"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatInterfaceProps {
  persona: string
  onBack: () => void
}

export function ChatInterface({ persona, onBack }: ChatInterfaceProps) {
  const { getPersonaByName } = usePersonas()
  const personaData = getPersonaByName(persona)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: persona === "Hitesh Sir" ? `Haanji. Aaj kispe charcha kare? ` : "Hey, There! Aaj kya sikhna hai batao!",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  function getSessionId() {
  const KEY = "chatSessionId";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id =
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.floor(Math.random() * 100000)}`);
    localStorage.setItem(KEY, id);
  }
  return id;
}

  function clearSession() {
  const KEY = "chatSessionId";
  localStorage.removeItem(KEY);
  // also clear client-side messages if you want:
  setMessages([]);
  // If backend supports clearing history, you could also call an endpoint:
  // fetch("/api/reset-session", { method: "POST", body: JSON.stringify({ sessionId }) })
}

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    const sessionId = getSessionId();

      try {
      const url =
      persona === "Hitesh Sir"
        ? `${apiUrl}/api/hitesh-chat`
        : `${apiUrl}/api/piyush-chat`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage.content,
        sessionId,
      }),
    });

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const aiTimestamp = data.timestamp ? new Date(data.timestamp) : new Date();

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.reply,
        sender: "ai",
        timestamp: aiTimestamp,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("send message error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
    } 

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const iconOptions = [
    { value: "GraduationCap", icon: "🎓" },
    { value: "Code", icon: "💻" },
    { value: "Heart", icon: "❤️" },
    { value: "Briefcase", icon: "💼" },
    { value: "Gamepad2", icon: "🎮" },
    { value: "Palette", icon: "🎨" },
    { value: "BookOpen", icon: "📚" },
    { value: "Stethoscope", icon: "🩺" },
    { value: "Music", icon: "🎵" },
    { value: "Camera", icon: "📷" },
  ]

  const personaImageMap: Record<string, string> = {
  "Hitesh Sir": "/hitesh.jpeg",
  "Piyush Sir": "/piyush.jpeg",
}

const personaIcon = personaImageMap[persona] ?? ""

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-gradient-to-r from-card to-card/80 backdrop-blur-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-tangerine-500/10 hover:text-tangerine-600 dark:hover:text-tangerine-400 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-tangerine-500/30 transition-all duration-200 hover:ring-tangerine-500/50">
                {personaIcon ? (
      <AvatarImage src={personaIcon} alt={persona} className="rounded-full object-cover" />
    ) : (
      <AvatarFallback className="bg-gradient-to-br from-tangerine-500 to-tangerine-600 text-white text-lg">
        {persona[0]} {/* fallback to first letter */}
      </AvatarFallback>
    )}
              </Avatar>
              <div>
                <h2 className="font-bold text-lg text-foreground">{persona}</h2>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-500 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {message.sender === "ai" && (
                <Avatar className="w-9 h-9 mt-1 ring-2 ring-tangerine-500/30 transition-all duration-200 hover:ring-tangerine-500/50">
                  {personaIcon ? (
      <AvatarImage src={personaIcon} alt={persona} className="rounded-full object-cover" />
    ) : (
      <AvatarFallback className="bg-gradient-to-br from-tangerine-500 to-tangerine-600 text-white">
        {persona[0]}
      </AvatarFallback>
    )}
                </Avatar>
              )}
              <Card
                className={`max-w-[75%] p-4 transition-all duration-200 hover:shadow-lg ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-tangerine-500 to-tangerine-600 text-white shadow-tangerine-500/20"
                    : "bg-gradient-to-br from-card to-card/80 shadow-md hover:shadow-tangerine-500/10 dark:border dark:border-tangerine-500/30"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
              {message.sender === "user" && (
                <Avatar className="w-9 h-9 mt-1 ring-2 ring-tangerine-500/30 transition-all duration-200 hover:ring-tangerine-500/50">
                  <AvatarFallback className="bg-gradient-to-br from-tangerine-500 to-tangerine-600 text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
              <Avatar className="w-9 h-9 mt-1 ring-2 ring-tangerine-500/30">
                  {personaIcon ? (
      <AvatarImage src={personaIcon} alt={persona} className="rounded-full object-cover" />
    ) : (
      <AvatarFallback className="bg-gradient-to-br from-tangerine-500 to-tangerine-600 text-white text-lg">
        {persona[0]} {/* fallback to first letter */}
      </AvatarFallback>
    )}
              </Avatar>
              <Card className="max-w-[75%] p-4 bg-gradient-to-br from-card to-card/80 dark:border dark:border-tangerine-500/30">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 bg-tangerine-500 rounded-full animate-bounce" />
                  <div
                    className="w-2.5 h-2.5 bg-tangerine-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="w-2.5 h-2.5 bg-tangerine-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <span className="text-xs text-muted-foreground ml-2 animate-pulse">{persona} is thinking...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-gradient-to-r from-card to-card/80 backdrop-blur-sm p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${persona}...`}
              disabled={isLoading}
              className="pr-12 bg-background/50 border-tangerine-500/20 focus:border-tangerine-500 focus:ring-tangerine-500/20 transition-all duration-200 placeholder:text-muted-foreground/60"
            />
            {inputValue.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-tangerine-500 rounded-full animate-pulse" />
              </div>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-tangerine-500 to-tangerine-600 hover:from-tangerine-600 hover:to-tangerine-700 text-white shadow-lg hover:shadow-tangerine-500/25 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
