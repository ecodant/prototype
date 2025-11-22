"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PliegoCondiciones } from "@/lib/types"

interface PliegoFormProps {
  onComplete: (data: PliegoCondiciones) => void
  initialData?: PliegoCondiciones | null
}

export function PliegoForm({ onComplete, initialData }: PliegoFormProps) {
  const [formData, setFormData] = useState<PliegoCondiciones>(
    initialData || {
      id: crypto.randomUUID(),
      numero: "",
      fechaPublicacion: "",
      fechaCierre: "",
      presupuestoOficial: 0,
      plazoContractual: "",
      requisitosTecnicos: "",
      requisitosJuridicos: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.numero.trim()) newErrors.numero = "El número es requerido"
    if (!formData.fechaPublicacion) newErrors.fechaPublicacion = "La fecha de publicación es requerida"
    if (!formData.fechaCierre) newErrors.fechaCierre = "La fecha de cierre es requerida"
    if (formData.presupuestoOficial <= 0) newErrors.presupuestoOficial = "El presupuesto debe ser mayor a 0"
    if (!formData.plazoContractual.trim()) newErrors.plazoContractual = "El plazo contractual es requerido"
    if (!formData.requisitosTecnicos.trim()) newErrors.requisitosTecnicos = "Los requisitos técnicos son requeridos"
    if (!formData.requisitosJuridicos.trim()) newErrors.requisitosJuridicos = "Los requisitos jurídicos son requeridos"

    // Validate dates
    if (formData.fechaPublicacion && formData.fechaCierre) {
      const pubDate = new Date(formData.fechaPublicacion)
      const closeDate = new Date(formData.fechaCierre)
      if (closeDate <= pubDate) {
        newErrors.fechaCierre = "La fecha de cierre debe ser posterior a la fecha de publicación"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const updateField = (field: keyof PliegoCondiciones, value: string | number) => {
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
        <CardTitle>Pliego de Condiciones</CardTitle>
        <CardDescription>Complete la información del pliego de condiciones</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => updateField("numero", e.target.value)}
                aria-invalid={!!errors.numero}
              />
              {errors.numero && <p className="text-sm text-destructive">{errors.numero}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaPublicacion">Fecha de Publicación</Label>
              <Input
                id="fechaPublicacion"
                type="date"
                value={formData.fechaPublicacion}
                onChange={(e) => updateField("fechaPublicacion", e.target.value)}
                aria-invalid={!!errors.fechaPublicacion}
              />
              {errors.fechaPublicacion && <p className="text-sm text-destructive">{errors.fechaPublicacion}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaCierre">Fecha de Cierre</Label>
              <Input
                id="fechaCierre"
                type="date"
                value={formData.fechaCierre}
                onChange={(e) => updateField("fechaCierre", e.target.value)}
                aria-invalid={!!errors.fechaCierre}
              />
              {errors.fechaCierre && <p className="text-sm text-destructive">{errors.fechaCierre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="presupuestoOficial">Presupuesto Oficial</Label>
              <Input
                id="presupuestoOficial"
                type="number"
                min="0"
                step="0.01"
                value={formData.presupuestoOficial}
                onChange={(e) => updateField("presupuestoOficial", Number.parseFloat(e.target.value) || 0)}
                aria-invalid={!!errors.presupuestoOficial}
              />
              {errors.presupuestoOficial && <p className="text-sm text-destructive">{errors.presupuestoOficial}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="plazoContractual">Plazo Contractual</Label>
              <Input
                id="plazoContractual"
                value={formData.plazoContractual}
                onChange={(e) => updateField("plazoContractual", e.target.value)}
                placeholder="Ej: 12 meses"
                aria-invalid={!!errors.plazoContractual}
              />
              {errors.plazoContractual && <p className="text-sm text-destructive">{errors.plazoContractual}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requisitosTecnicos">Requisitos Técnicos</Label>
            <Textarea
              id="requisitosTecnicos"
              value={formData.requisitosTecnicos}
              onChange={(e) => updateField("requisitosTecnicos", e.target.value)}
              rows={4}
              aria-invalid={!!errors.requisitosTecnicos}
            />
            {errors.requisitosTecnicos && <p className="text-sm text-destructive">{errors.requisitosTecnicos}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requisitosJuridicos">Requisitos Jurídicos</Label>
            <Textarea
              id="requisitosJuridicos"
              value={formData.requisitosJuridicos}
              onChange={(e) => updateField("requisitosJuridicos", e.target.value)}
              rows={4}
              aria-invalid={!!errors.requisitosJuridicos}
            />
            {errors.requisitosJuridicos && <p className="text-sm text-destructive">{errors.requisitosJuridicos}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit">Guardar y Continuar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
