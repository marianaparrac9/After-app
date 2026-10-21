// Porcentaje de capacidad usada. Ej: 174 de 200 -> 87
export const getCapacityPercent = (attendees: number, capacity: number) => {
  if (capacity === 0) return 0;
  return Math.round((attendees / capacity) * 100);
};
