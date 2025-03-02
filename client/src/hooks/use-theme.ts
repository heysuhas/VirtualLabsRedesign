import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { Preferences } from "@shared/schema";

export function useTheme() {
  const { data: preferences } = useQuery<Preferences>({
    queryKey: ["/api/preferences"],
  });

  const mutation = useMutation({
    mutationFn: async (theme: string) => {
      await apiRequest("POST", "/api/preferences", { theme });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
    },
  });

  useEffect(() => {
    // Set initial theme
    const theme = preferences?.theme || "system";
    updateTheme(theme);
  }, [preferences?.theme]);

  function updateTheme(theme: string) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }

  return {
    theme: preferences?.theme || "system",
    setTheme: (theme: string) => mutation.mutate(theme),
  };
}
