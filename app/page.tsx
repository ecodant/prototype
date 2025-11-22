"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/step-indicator"
import { PliegoForm } from "@/components/pliego-form"
import { VisitaTecnicaForm } from "@/components/visita-tecnica-form"
import { PropuestaForm } from "@/components/propuesta-form"
import { ResumenFlujo } from "@/components/resumen-flujo"
import type { FlowData, PliegoCondiciones, VisitaTecnica, Propuesta } from "@/lib/types"

const STEPS = ["Pliego de Condiciones", "Visita Técnica", "Propuesta", "Resumen"]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [flowData, setFlowData] = useState<FlowData>({
    pliego: null,
    visitaTecnica: null,
    propuesta: null,
  })

  const handlePliegoComplete = (data: PliegoCondiciones) => {
    setFlowData((prev) => ({ ...prev, pliego: data }))
    setCurrentStep(2)
  }

  const handleVisitaTecnicaComplete = (data: VisitaTecnica) => {
    setFlowData((prev) => ({ ...prev, visitaTecnica: data }))
    setCurrentStep(3)
  }

  const handlePropuestaComplete = (data: Propuesta) => {
    setFlowData((prev) => ({ ...prev, propuesta: data }))
    setCurrentStep(4)
  }

  const handleReset = () => {
    setFlowData({
      pliego: null,
      visitaTecnica: null,
      propuesta: null,
    })
    setCurrentStep(1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Presentar Oferta al Cliente</h1>
          <p className="text-muted-foreground mt-2">Flujo digital para el proceso de presentación de propuestas</p>
        </div>

        <StepIndicator currentStep={currentStep} steps={STEPS} />

        <div className="mt-8">
          {currentStep === 1 && <PliegoForm onComplete={handlePliegoComplete} initialData={flowData.pliego} />}

          {currentStep === 2 && flowData.pliego && (
            <VisitaTecnicaForm
              onComplete={handleVisitaTecnicaComplete}
              onBack={handleBack}
              pliegoId={flowData.pliego.id}
              initialData={flowData.visitaTecnica}
            />
          )}

          {currentStep === 3 && flowData.pliego && flowData.visitaTecnica && (
            <PropuestaForm
              onComplete={handlePropuestaComplete}
              onBack={handleBack}
              pliegoId={flowData.pliego.id}
              initialData={flowData.propuesta}
            />
          )}

          {currentStep === 4 && <ResumenFlujo data={flowData} onReset={handleReset} />}
        </div>
      </div>
    </main>
  )
}
