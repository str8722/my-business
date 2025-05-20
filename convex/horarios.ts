import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Consulta para obtener todos los horarios
export const obtenerHorarios = query({
    handler: async (ctx) => {
        return await ctx.db.query("horarios").collect();
    },
});

// Consulta para obtener un horario por ID
export const obtenerHorarioPorId = query({
    args: { id: v.id("horarios") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// Mutación para crear un nuevo horario
export const crearHorario = mutation({
    args: {
        periodo: v.string(),
    },
    handler: async (ctx, args) => {
        const { periodo } = args;
        return await ctx.db.insert("horarios", {
            periodo,
        });
    },
});

// Mutación para actualizar un horario existente
export const actualizarHorario = mutation({
    args: {
        id: v.id("horarios"),
        periodo: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, periodo } = args;
        return await ctx.db.patch(id, {
            periodo,
        });
    },
});

// Mutación para eliminar un horario
export const eliminarHorario = mutation({
    args: {
        id: v.id("horarios"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    },
});
