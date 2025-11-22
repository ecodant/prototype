"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted && !isCurrent && "border-muted-foreground/30 bg-background text-muted-foreground",
                  )}
                >
                  {isCompleted ? <Check className="size-5" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "text-center text-sm font-medium",
                    (isCurrent || isCompleted) && "text-foreground",
                    !isCurrent && !isCompleted && "text-muted-foreground",
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 transition-colors mx-2",
                    isCompleted ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
