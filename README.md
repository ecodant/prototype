# Presentar Oferta al Cliente - Prototipo de Flujo Digital

Este repositorio contiene un **prototipo funcional** del flujo digital para el proceso clave de la empresa "Presentar oferta de construcción al cliente", modelado en tres actividades esenciales:

1. Publicar pliego de condiciones y recibir convocatoria
2. Analizar técnicamente requisitos y coordinar visita técnica
3. Presentar y entregar la propuesta al cliente

## Objetivo

El proyecto busca demostrar, de manera simple y visual, cómo pueden gestionarse y automatizarse las principales fases del proceso de presentación de una oferta de construcción, haciendo énfasis en la captura, validación y trazabilidad de la información central para cada etapa. Es ideal como referencia para modelado rápido de requisitos, pruebas de concepto UX o como base para un desarrollo mayor.

---

## Tecnologías utilizadas

- **React** (Vite recomendado)
- **Typescript**
- **TailwindCSS**

---

## ⚡ Estructura y Flujo del Prototipo

- **Paso 1:** El usuario diligencia el formulario “Pliego de Condiciones”, que incluye exactamente los campos definidos en el dominio del modelo de datos de licitaciones.
- **Paso 2:** Una vez publicado el pliego, se habilita la programación y registro digital de la visita técnica, donde se cargan responsable, fecha/lugar, observaciones y evidencias.
- **Paso 3:** Al tener una visita autorizada, el usuario puede radicar la propuesta técnico-económica, adjuntar documentación, enviar y visualizar el acuse electrónico de recibo.

Cada paso implementa validaciones sencillas, control de flujo y navegación guiada solo si el paso anterior está validado con éxito.
