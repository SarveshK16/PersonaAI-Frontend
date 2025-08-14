"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="hover:bg-tangerine-500/20">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="hover:bg-tangerine-500/20 transition-all duration-300 hover:scale-110"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-tangerine-600 dark:text-tangerine-400 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-4 w-4 text-tangerine-600 dark:text-tangerine-400 transition-transform duration-300 hover:rotate-12" />
      )}
    </Button>
  )
}
