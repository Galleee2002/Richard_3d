"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getColors,
  createColor,
  updateColor,
  deleteColor,
  toggleColorAvailability,
} from "../services/color.service";
import type { ColorFormData } from "../schemas/color.schema";
import type { Color } from "../types";

export function useColorsQuery() {
  return useQuery({
    queryKey: ["colors", "list"],
    queryFn: getColors,
  });
}

export function useCreateColorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors", "list"] });
    },
  });
}

export function useUpdateColorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ColorFormData> }) =>
      updateColor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors", "list"] });
    },
  });
}

export function useDeleteColorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors", "list"] });
    },
  });
}

export function useToggleColorAvailabilityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, available }: { id: string; available: boolean }) =>
      toggleColorAvailability(id, available),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors", "list"] });
    },
  });
}

