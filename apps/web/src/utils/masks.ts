const formatPhone = useCallback((text: string) => {
  const c = text.replace(/\D/g, "");
  if (c.length === 0) return "";
  if (c.length <= 2) return c;
  if (c.length <= 7) return `(${c.slice(0, 2)}) ${c.slice(2)}`;
  return `(${c.slice(0, 2)}) ${c.slice(2, 7)}-${c.slice(7, 11)}`;
}, []);
