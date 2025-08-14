"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Save, X, Sparkles } from "lucide-react"
import { usePersonas } from "@/hooks/use-personas"

const iconOptions = [
  { value: "GraduationCap", label: "Teacher", icon: "🎓" },
  { value: "Code", label: "Developer", icon: "💻" },
  { value: "Heart", label: "Therapist", icon: "❤️" },
  { value: "Briefcase", label: "Business", icon: "💼" },
  { value: "Gamepad2", label: "Gamer", icon: "🎮" },
  { value: "Palette", label: "Artist", icon: "🎨" },
  { value: "BookOpen", label: "Scientist", icon: "📚" },
  { value: "Stethoscope", label: "Doctor", icon: "🩺" },
  { value: "Music", label: "Musician", icon: "🎵" },
  { value: "Camera", label: "Photographer", icon: "📷" },
]

interface PersonaManagerProps {
  selectedPersona: string | null
  onSelectPersona: (persona: string) => void
}

export function PersonaManager({ selectedPersona, onSelectPersona }: PersonaManagerProps) {
  const { personas, addPersona, updatePersona, deletePersona } = usePersonas()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "GraduationCap",
    tags: "",
    systemPrompt: "",
  })

  const handleCreatePersona = () => {
    if (!formData.name.trim() || !formData.description.trim()) return

    const newPersona = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      systemPrompt: formData.systemPrompt,
      isCustom: true,
    }

    addPersona(newPersona)
    setFormData({ name: "", description: "", icon: "GraduationCap", tags: "", systemPrompt: "" })
    setIsCreateDialogOpen(false)
  }

  const handleEditPersona = (persona: any) => {
    setEditingPersona(persona.id)
    setFormData({
      name: persona.name,
      description: persona.description,
      icon: persona.icon,
      tags: persona.tags.join(", "),
      systemPrompt: persona.systemPrompt || "",
    })
  }

  const handleUpdatePersona = () => {
    if (!editingPersona || !formData.name.trim() || !formData.description.trim()) return

    const updatedPersona = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      systemPrompt: formData.systemPrompt,
    }

    updatePersona(editingPersona, updatedPersona)
    setEditingPersona(null)
    setFormData({ name: "", description: "", icon: "GraduationCap", tags: "", systemPrompt: "" })
  }

  const handleDeletePersona = (personaId: string) => {
    deletePersona(personaId)
    if (selectedPersona === personas.find((p) => p.id === personaId)?.name) {
      onSelectPersona("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold font-serif bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            Manage Personas
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Create and customize your AI personalities</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg hover:shadow-accent/25 transition-all duration-200 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Create Persona
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Create New Persona
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., The Philosopher"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this persona's personality and expertise..."
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="icon" className="text-sm font-medium">
                  Icon
                </Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span>{option.icon}</span>
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags" className="text-sm font-medium">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., Wise, Thoughtful, Deep"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="systemPrompt" className="text-sm font-medium">
                  System Prompt (Optional)
                </Label>
                <Textarea
                  id="systemPrompt"
                  value={formData.systemPrompt}
                  onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                  placeholder="Custom instructions for how this persona should behave..."
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleCreatePersona} className="flex-1 bg-accent hover:bg-accent/90">
                  <Save className="w-4 h-4 mr-2" />
                  Create
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => {
          const isSelected = selectedPersona === persona.name
          const isEditing = editingPersona === persona.id

          return (
            <Card
              key={persona.id}
              className={`p-6 transition-all duration-300 hover:shadow-xl animate-in slide-in-from-bottom-4 ${
                isSelected
                  ? "ring-2 ring-accent bg-gradient-to-br from-accent/10 to-accent/5 shadow-accent/20"
                  : "hover:bg-gradient-to-br hover:from-muted/50 hover:to-muted/30 shadow-md hover:scale-105"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Persona name"
                    className="font-medium"
                  />
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description"
                    rows={2}
                  />
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Tags (comma-separated)"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleUpdatePersona} className="bg-accent hover:bg-accent/90">
                      <Save className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingPersona(null)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="cursor-pointer" onClick={() => onSelectPersona(persona.name)}>
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-12 h-12 ring-2 ring-accent/20 transition-all duration-200 hover:ring-accent/40">
                        {/* <AvatarFallback className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
                          {iconOptions.find((opt) => opt.value === persona.icon)?.icon || "🤖"}
                        </AvatarFallback> */}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-base font-serif">{persona.name}</h4>
                          {persona.isCustom && (
                            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                              Custom
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{persona.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {persona.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-accent/10 text-accent-foreground hover:bg-accent/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {persona.isCustom && (
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditPersona(persona)}
                        className="hover:bg-accent/20 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeletePersona(persona.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
