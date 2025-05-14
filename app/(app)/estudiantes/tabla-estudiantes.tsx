"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function TablaEstudiantes() {
  const router = useRouter();
  const estudiantes = useQuery(api.estudiantes.obtenerEstudiantes);

  if (estudiantes === undefined) {
    return <div>Cargando estudiantes...</div>;
  }

  const handleVerEstudiante = (id: string) => {
    router.push(`/estudiantes/${id}`);
  };

  const handleCrear = () => {
    router.push("/estudiantes/create");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lista de Estudiantes</h2>
        <Button onClick={handleCrear} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Estudiante
        </Button>
      </div>
      
      <Table>
        <TableCaption>Lista de estudiantes registrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Matrícula</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estudiantes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No hay estudiantes registrados
              </TableCell>
            </TableRow>
          ) : (
            estudiantes.map((estudiante) => (
              <TableRow 
                key={estudiante._id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleVerEstudiante(estudiante._id)}
              >
                <TableCell className="font-medium">
                  {estudiante.numMatricula}
                </TableCell>
                <TableCell>{estudiante.nombre}</TableCell>
                <TableCell>{estudiante.correo}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}