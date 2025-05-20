"use client";

import { useState, useEffect, use } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function EditarMateriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const idMateria = id as Id<"materias">;
  const router = useRouter();
  const materia = useQuery(api.materias.obtenerMateriasPorId, { id: idMateria });
  const actualizarMateria = useMutation(api.materias.actualizarMateria);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    identificador: "",
    nombreMateria: ""
  });
  
  // Cargar datos de la materia cuando estén disponibles
  useEffect(() => {
    if (materia) {
      setFormData({
        identificador: materia.identificador,
        nombreMateria: materia.nombreMateria
      });
    }
  }, [materia]);
  
  if (materia === undefined) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-full mb-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24 mr-2" />
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!materia) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Materia no encontrada</h1>
        </div>
        <p>No se pudo encontrar la Materia con el ID proporcionado.</p>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await actualizarMateria({
        id: materia._id,
        ...formData,
      });
      router.push(`/materias/${id}`);
    } catch (error) {
      console.error("Error al actualizar materia:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Editar Materia</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="font-semibold text-center">Modificar información de {materia.nombreMateria}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="numMatricula">Identificador</Label>
              <Input
                id="indentificador"
                name="identificador"
                value={formData.identificador}
                onChange={handleChange}
                placeholder="Ej: BIO, MAT, FIS"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nombreMateria">Nombre de la Materia</Label>
              <Input
                id="nombreMateria"
                name="nombreMateria"
                value={formData.nombreMateria}
                onChange={handleChange}
                placeholder="Nombre de la materia"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 mt-8"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}