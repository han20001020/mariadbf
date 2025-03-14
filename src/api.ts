const API_URL = import.meta.env.VITE_API_URL;

export const fetchReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/Reservations/test`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};
