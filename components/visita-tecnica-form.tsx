"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { VisitaTecnica } from "@/lib/types"

interface VisitaTecnicaFormProps {
  onComplete: (data: VisitaTecnica) => void
  onBack: () => void
  pliegoId: string
  initialData?: VisitaTecnica | null
}

export function VisitaTecnicaForm({ onComplete, onBack, pliegoId, initialData }: VisitaTecnicaFormProps) {
  const [formData, setFormData] = useState<VisitaTecnica>(
    initialData || {
      idVisita: crypto.randomUUID(),
      idPliegoVinculado: pliegoId,
      fechaVisita: "",
      responsable: "",
      lugar: "",
      estadoVisita: "Programada",
      observaciones: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fechaVisita) newErrors.fechaVisita = "La fecha de visita es requerida"
    if (!formData.responsable.trim()) newErrors.responsable = "El responsable es requerido"
    if (!formData.lugar.trim()) newErrors.lugar = "El lugar es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const updateField = (field: keyof VisitaTecnica, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visita Técnica</CardTitle>
        <CardDescription>Registre los detalles de la visita técnica</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fechaVisita">Fecha de Visita</Label>
              <Input
                id="fechaVisita"
                type="date"
                value={formData.fechaVisita}
                onChange={(e) => updateField("fechaVisita", e.target.value)}
                aria-invalid={!!errors.fechaVisita}
              />
              {errors.fechaVisita && <p className="text-sm text-destructive">{errors.fechaVisita}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsable">Responsable</Label>
              <Input
                id="responsable"
                value={formData.responsable}
                onChange={(e) => updateField("responsable", e.target.value)}
                aria-invalid={!!errors.responsable}
              />
              {errors.responsable && <p className="text-sm text-destructive">{errors.responsable}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lugar">Lugar</Label>
              <Input
                id="lugar"
                value={formData.lugar}
                onChange={(e) => updateField("lugar", e.target.value)}
                aria-invalid={!!errors.lugar}
              />
              {errors.lugar && <p className="text-sm text-destructive">{errors.lugar}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estadoVisita">Estado de Visita</Label>
              <select
                id="estadoVisita"
                value={formData.estadoVisita}
                onChange={(e) => updateField("estadoVisita", e.target.value as VisitaTecnica["estadoVisita"])}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
              >
                <option value="Programada">Programada</option>
                <option value="Autorizada">Autorizada</option>
                <option value="Realizada">Realizada</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => updateField("observaciones", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidencia">Evidencia (opcional)</Label>
            <Input
              id="evidencia"
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                updateField("evidencia", files)
              }}
            />
          </div>

          <div className="flex justify-between gap-3">
            <Button type="button" variant="outline" onClick={onBack}>
              Volver
            </Button>
            <Button type="submit">Guardar y Continuar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
