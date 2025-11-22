"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Propuesta } from "@/lib/types"

interface PropuestaFormProps {
  onComplete: (data: Propuesta) => void
  onBack: () => void
  pliegoId: string
  initialData?: Propuesta | null
}

export function PropuestaForm({ onComplete, onBack, pliegoId, initialData }: PropuestaFormProps) {
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState<Propuesta>(
    initialData || {
      idPropuesta: crypto.randomUUID(),
      idPliegoVinculado: pliegoId,
      documentosAnexos: [],
      responsablePresenta: "",
      fechaEnvio: today,
      comentarios: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.responsablePresenta.trim()) newErrors.responsablePresenta = "El responsable es requerido"
    if (formData.documentosAnexos.length === 0) newErrors.documentosAnexos = "Debe adjuntar al menos un documento"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Generate acuse de recibo
      const acuse = `Acuse de recibo generado - ${new Date().toLocaleString()}\nID Propuesta: ${formData.idPropuesta}`
      onComplete({ ...formData, acuseRecibo: acuse })
    }
  }

  const updateField = (field: keyof Propuesta, value: string | File[]) => {
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
        <CardTitle>Presentar Propuesta</CardTitle>
        <CardDescription>Complete y radicque su propuesta final</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="responsablePresenta">Responsable de Presentación</Label>
              <Input
                id="responsablePresenta"
                value={formData.responsablePresenta}
                onChange={(e) => updateField("responsablePresenta", e.target.value)}
                aria-invalid={!!errors.responsablePresenta}
              />
              {errors.responsablePresenta && <p className="text-sm text-destructive">{errors.responsablePresenta}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaEnvio">Fecha de Envío</Label>
              <Input
                id="fechaEnvio"
                type="date"
                value={formData.fechaEnvio}
                onChange={(e) => updateField("fechaEnvio", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentosAnexos">Documentos Anexos *</Label>
            <Input
              id="documentosAnexos"
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                updateField("documentosAnexos", files)
              }}
              aria-invalid={!!errors.documentosAnexos}
            />
            {errors.documentosAnexos && <p className="text-sm text-destructive">{errors.documentosAnexos}</p>}
            {formData.documentosAnexos.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {formData.documentosAnexos.length} archivo(s) seleccionado(s)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios</Label>
            <Textarea
              id="comentarios"
              value={formData.comentarios}
              onChange={(e) => updateField("comentarios", e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-between gap-3">
            <Button type="button" variant="outline" onClick={onBack}>
              Volver
            </Button>
            <Button type="submit">Radicar Propuesta</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
