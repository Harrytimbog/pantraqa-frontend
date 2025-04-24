import { useEffect, useState, useCallback } from "react";
import api from "../../lib/axios";
import { format } from "date-fns";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { saveAs } from "file-saver";
import { FiCalendar } from "react-icons/fi";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LogUser {
  id: number;
  email: string;
  name: string;
}

interface LogDrink {
  id: number;
  name: string;
  size: string;
  category: string;
}

interface LogLocation {
  id: number;
  name: string;
  type: string;
}

interface StockLog {
  id: number;
  action: "in" | "out";
  quantity: number;
  createdAt: string;
  userId: number;
  Drink: LogDrink;
  StorageLocation: LogLocation;
}

interface Filters {
  userId: string;
  drinkId: string;
  storageLocationId: string;
  action: string;
  dateFrom: string;
  dateTo: string;
}

const StockLogs = () => {
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [users, setUsers] = useState<LogUser[]>([]);
  const [drinks, setDrinks] = useState<LogDrink[]>([]);
  const [locations, setLocations] = useState<LogLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<Filters>({
    userId: "",
    drinkId: "",
    storageLocationId: "",
    action: "",
    dateFrom: "",
    dateTo: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch filter options for users, drinks, and locations
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [usersRes, drinksRes, locsRes] = await Promise.all([
          api.get("/users"),
          api.get("/drinks"),
          api.get("/storage-locations"),
        ]);
        setUsers(usersRes.data);
        setDrinks(drinksRes.data.drinks || drinksRes.data);
        setLocations(locsRes.data.locations || locsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load filter options", err);
        setLoading(false);
      }
    };
    fetchFilters();
  }, []);

  // Fetch logs based on filters and pagination
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        ...filters,
      }).toString();
      const res = await api.get(`/stocklogs?${query}`);
      if (res.data && res.data.logs && Array.isArray(res.data.logs)) {
        setLogs(res.data.logs);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load logs");
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchLogs();
  }, [filters, page, fetchLogs]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  const clearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const renderBadge = (label: string, key: keyof typeof filters) =>
    filters[key] && (
      <span className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
        {label}: {filters[key]}{" "}
        <FaTimes
          onClick={() => clearFilter(key)}
          className="cursor-pointer text-xs"
        />
      </span>
    );

  // Define chart data with explicit type for accumulator
  const chartData = {
    labels: [...new Set(logs.map((log) => log.Drink.name))], // Unique drink names
    datasets: [
      {
        label: "Quantity In Stock",
        data: logs
          .filter((log) => log.action === "in") // Only "in" actions
          .reduce<{ [key: string]: number }>((acc, log) => {
            acc[log.Drink.name] = (acc[log.Drink.name] || 0) + log.quantity;
            return acc;
          }, {}),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Quantity Out of Stock",
        data: logs
          .filter((log) => log.action === "out") // Only "out" actions
          .reduce<{ [key: string]: number }>((acc, log) => {
            acc[log.Drink.name] = (acc[log.Drink.name] || 0) + log.quantity;
            return acc;
          }, {}),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const exportPDF = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        dateFrom: filters.dateFrom || "",
        dateTo: filters.dateTo || "",
      }).toString();
      const response = await api.get(`/stocklogs/export/pdf?${queryParams}`, {
        responseType: "blob",
      });
      const file = new Blob([response.data], { type: "application/pdf" });
      saveAs(file, "stocklogs.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const exportCSV = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        dateFrom: filters.dateFrom || "",
        dateTo: filters.dateTo || "",
      }).toString();
      const response = await api.get(`/stocklogs/export/csv?${queryParams}`, {
        responseType: "blob",
      });
      const file = new Blob([response.data], { type: "text/csv" });
      saveAs(file, "stocklogs.csv");
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading logs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-secondary text-center">
        Stock History Logs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* User Dropdown */}
        <select
          onChange={(e) => handleFilterChange("userId", e.target.value)}
          value={filters.userId}
          className="border rounded p-2"
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>

        {/* Drink Dropdown */}
        <select
          onChange={(e) => handleFilterChange("drinkId", e.target.value)}
          value={filters.drinkId}
          className="border rounded p-2"
        >
          <option value="">All Drinks</option>
          {drinks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.size})
            </option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select
          onChange={(e) =>
            handleFilterChange("storageLocationId", e.target.value)
          }
          value={filters.storageLocationId}
          className="border rounded p-2"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        {/* Action Dropdown */}
        <select
          onChange={(e) => handleFilterChange("action", e.target.value)}
          value={filters.action}
          className="border rounded p-2"
        >
          <option value="">All Actions</option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>

        {/* Date Range Inputs */}
        <div className="flex flex-col">
          <label
            htmlFor="date-from"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Date From
          </label>
          <div className="relative flex items-center">
            <input
              id="date-from"
              type="date"
              aria-label="Date From"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              className="border rounded p-2 pr-10 w-full"
            />
            <FiCalendar className="absolute right-3 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="date-to"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Date To
          </label>
          <div className="relative flex items-center">
            <input
              id="date-to"
              type="date"
              aria-label="Date To"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              className="border rounded p-2 pr-10 w-full"
            />
            <FiCalendar className="absolute right-3 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Applied Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        {renderBadge("User", "userId")}
        {renderBadge("Drink", "drinkId")}
        {renderBadge("Location", "storageLocationId")}
        {renderBadge("Action", "action")}
        {renderBadge("From", "dateFrom")}
        {renderBadge("To", "dateTo")}
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end mb-6 gap-4">
        <button
          onClick={exportPDF}
          className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
        >
          Export PDF
        </button>
        <button
          onClick={exportCSV}
          className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300"
        >
          Export CSV
        </button>
      </div>

      {/* Button to open the modal for charts */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal for chart view
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          View Charts
        </button>
      </div>

      {/* Logs */}
      <ul className="space-y-4">
        {logs.map((log) => (
          <li key={log.id} className="bg-white shadow rounded p-4">
            <p>
              <span className="font-semibold text-primary">
                {log.Drink.name} ({log.Drink.size})
              </span>{" "}
              was{" "}
              <span
                className={
                  log.action === "in" ? "text-green-600" : "text-red-500"
                }
              >
                stocked {log.action}
              </span>{" "}
              by{" "}
              <span className="font-medium">
                {users.find((u) => u.id === log.userId)?.name}
              </span>{" "}
              at <span className="font-medium">{log.StorageLocation.name}</span>{" "}
              on{" "}
              <span className="text-sm text-gray-600">
                {format(new Date(log.createdAt), "PPpp")}
              </span>
              .
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal to display charts */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Stock Chart Modal"
        className="modal-class relative bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-auto my-auto"
        overlayClassName="overlay-class bg-gray-800 bg-opacity-50 fixed inset-0"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Close
          </button>
        </div>
        <h2 className="text-center text-xl mb-6">Stock Overview</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </Modal>
    </div>
  );
};

export default StockLogs;
