"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { FlowData } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"

interface ResumenFlujoProps {
  data: FlowData
  onReset: () => void
}

export function ResumenFlujo({ data, onReset }: ResumenFlujoProps) {
  const { pliego, visitaTecnica, propuesta } = data

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-8 text-primary" />
            <div>
              <CardTitle>Proceso Completado</CardTitle>
              <CardDescription>Su propuesta ha sido radicada exitosamente</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {propuesta?.acuseRecibo && (
            <div className="rounded-md bg-muted p-4">
              <p className="whitespace-pre-line text-sm font-mono">{propuesta.acuseRecibo}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumen del Flujo</CardTitle>
          <CardDescription>Información completa del proceso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pliego && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Pliego de Condiciones</h3>
                <Badge>Completado</Badge>
              </div>
              <Separator />
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Número:</dt>
                  <dd className="font-medium">{pliego.numero}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Fecha Publicación:</dt>
                  <dd className="font-medium">{pliego.fechaPublicacion}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Fecha Cierre:</dt>
                  <dd className="font-medium">{pliego.fechaCierre}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Presupuesto:</dt>
                  <dd className="font-medium">${pliego.presupuestoOficial.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Plazo:</dt>
                  <dd className="font-medium">{pliego.plazoContractual}</dd>
                </div>
              </dl>
            </div>
          )}

          {visitaTecnica && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Visita Técnica</h3>
                <Badge>Completado</Badge>
              </div>
              <Separator />
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Fecha:</dt>
                  <dd className="font-medium">{visitaTecnica.fechaVisita}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Responsable:</dt>
                  <dd className="font-medium">{visitaTecnica.responsable}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Lugar:</dt>
                  <dd className="font-medium">{visitaTecnica.lugar}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estado:</dt>
                  <dd>
                    <Badge variant="secondary">{visitaTecnica.estadoVisita}</Badge>
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {propuesta && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Propuesta</h3>
                <Badge>Radicada</Badge>
              </div>
              <Separator />
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ID Propuesta:</dt>
                  <dd className="font-medium font-mono text-xs">{propuesta.idPropuesta}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Responsable:</dt>
                  <dd className="font-medium">{propuesta.responsablePresenta}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Fecha Envío:</dt>
                  <dd className="font-medium">{propuesta.fechaEnvio}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Documentos:</dt>
                  <dd className="font-medium">{propuesta.documentosAnexos.length} archivo(s)</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="pt-4">
            <Button onClick={onReset} variant="outline" className="w-full bg-transparent">
              Iniciar Nuevo Proceso
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
