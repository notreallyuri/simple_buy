export const formatPhone = (input: string) => {
  let value = input.replace(/[^\d+]/g, "");

  if (!value.startsWith("+")) value = "+" + value;

  return value.slice(0, 16)
};
