"use client"

import { useState, useEffect } from "react"

export interface Persona {
  id: string
  name: string
  description: string
  icon: string
  tags: string[]
  systemPrompt?: string
  isCustom?: boolean
}

const defaultPersonas: Persona[] = [
  {
    id: "hitesh-sir",
    name: "Hitesh Sir",
    description:
      "Experienced educator and mentor specializing in web development, JavaScript, and modern frameworks. Known for clear explanations and practical teaching approach.",
    icon: "👨‍🏫",
    tags: ["Educator", "Web Development", "JavaScript", "Mentor"],
    systemPrompt:
      "You are Hitesh Sir, an experienced web development educator. You explain concepts clearly, provide practical examples, and encourage students to build projects. You're patient, knowledgeable about JavaScript, React, Node.js, and modern web technologies. Always provide actionable advice and real-world context.",
  },
  {
    id: "piyush-sir",
    name: "Piyush Sir",
    description:
      "Tech entrepreneur and coding instructor with expertise in full-stack development, system design, and career guidance. Focuses on industry best practices and professional growth.",
    icon: "👨‍💻",
    tags: ["Entrepreneur", "Full-Stack", "System Design", "Career Guide"],
    systemPrompt:
      "You are Piyush Sir, a tech entrepreneur and coding instructor. You focus on full-stack development, system design, and career guidance. You provide industry insights, best practices, and help students understand how to build scalable applications. You're practical, business-minded, and always think about real-world applications.",
  },
]

export function usePersonas() {
  const [personas, setPersonas] = useState<Persona[]>(defaultPersonas)

  useEffect(() => {
    const savedPersonas = localStorage.getItem("custom-personas")
    if (savedPersonas) {
      try {
        const customPersonas = JSON.parse(savedPersonas)
        setPersonas([...defaultPersonas, ...customPersonas])
      } catch (error) {
        console.error("Failed to load custom personas:", error)
      }
    }
  }, [])

  const saveCustomPersonas = (allPersonas: Persona[]) => {
    const customPersonas = allPersonas.filter((p) => p.isCustom)
    localStorage.setItem("custom-personas", JSON.stringify(customPersonas))
  }

  const addPersona = (persona: Persona) => {
    const newPersonas = [...personas, persona]
    setPersonas(newPersonas)
    saveCustomPersonas(newPersonas)
  }

  const updatePersona = (id: string, updates: Partial<Persona>) => {
    const newPersonas = personas.map((p) => (p.id === id ? { ...p, ...updates } : p))
    setPersonas(newPersonas)
    saveCustomPersonas(newPersonas)
  }

  const deletePersona = (id: string) => {
    const newPersonas = personas.filter((p) => p.id !== id)
    setPersonas(newPersonas)
    saveCustomPersonas(newPersonas)
  }

  const getPersonaByName = (name: string) => {
    return personas.find((p) => p.name === name)
  }

  return {
    personas,
    addPersona,
    updatePersona,
    deletePersona,
    getPersonaByName,
  }
}
