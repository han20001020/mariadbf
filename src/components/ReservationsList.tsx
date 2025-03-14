import { useEffect, useState } from "react";

// 定義 Reservation 類型
type Reservation = {
  reservation_id: number;
  student_id: string;
  seat_id: number;
  timeslot_id: number;
  create_time: string;
};

const API_URL = "http://localhost:2083/Reservations/test";

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 獲取數據
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched reservations:", data); // 確認 API 資料
        setReservations(data);
      } catch (err) {
        setError("無法獲取資料，請稍後再試");
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Reservations List</h2>
      {loading && <p className="loading">載入中...</p>}
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Student ID</th>
              <th>Seat ID</th>
              <th>Timeslot ID</th>
              <th>Create Time</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.student_id}</td>
                <td>{reservation.seat_id}</td>
                <td>{reservation.timeslot_id}</td>
                <td>{reservation.create_time.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;
