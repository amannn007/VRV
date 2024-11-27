import React, { useState, useEffect } from "react";
import { FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Assuming you have a useAuth hook to handle logout
import { Bar, Pie } from "react-chartjs-2";  // Import chart components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    profilePicture: "",
    status: "Active",
  });
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      lastLogin: "2024-11-25 10:30:00",
      status: "Active",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "creator",
      lastLogin: "2024-11-24 15:20:00",
      status: "Inactive",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    // Add more members as needed
  ]);

  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddMember = () => {
    const newMemberWithId = { ...newMember, id: Date.now() };
    setMembers([...members, newMemberWithId]);
    setIsModalOpen(false);
    setNewMember({
      name: "",
      email: "",
      profilePicture: "",
      status: "Active",
    });
  };

  const handleLogOut = () => {
    logout();
  };

  // Count Active and Inactive members
  const activeCount = members.filter((member) => member.status === "Active").length;
  const inactiveCount = members.filter((member) => member.status === "Inactive").length;

  // Bar Chart Data
  const barChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Members',
        data: [activeCount, inactiveCount],  // Dynamic values
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [activeCount, inactiveCount],  // Dynamic values
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-indigo-600 text-white transition-all duration-300 p-4`}
      >
        <div className="flex justify-between items-center">
          <h2
            className={`text-xl font-bold transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin Dashboard
          </h2>
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? "<" : ">"}
          </button>
        </div>

        <nav className="mt-8">
          <ul>
            <li
              className={`flex items-center text-sm mt-4 hover:bg-indigo-700 rounded-lg p-2`}
              onClick={() => setIsModalOpen(true)} // Opens member adding modal
            >
              <FaUsers className="mr-2" />
              <a href="#" className="flex-1">
                Members
              </a>
            </li>
            <li
              className="flex items-center text-sm mt-4 hover:bg-indigo-700 rounded-lg p-2 cursor-pointer"
              onClick={handleLogOut}
            >
              <FaSignOutAlt className="mr-2" />
              <a href="#" className="flex-1">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <section>
          <h1 className="text-3xl font-bold mb-4">Manage Members</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-indigo-700"
          >
            Add New Member
          </button>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-indigo-700 text-white">
                  <th className="py-3 px-4 text-left">Profile</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b hover:bg-gray-100 transition-all"
                  >
                    <td className="py-2 px-4 text-center">
                      <img
                        src={member.profilePicture}
                        alt={member.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 text-sm">{member.name}</td>
                    <td className="py-2 px-4 text-sm">{member.email}</td>
                    <td className="py-2 px-4 text-sm">{member.status}</td>
                    <td className="py-2 px-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-indigo-700 mb-4">Members Bar Chart</h2>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-indigo-700 mb-4">Members Pie Chart</h2>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          </div>
        </section>
      </main>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Add New Member</h2>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="border px-4 py-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="border px-4 py-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="block text-gray-700 mb-2">Profile Picture URL</label>
            <input
              type="url"
              value={newMember.profilePicture}
              onChange={(e) => setNewMember({ ...newMember, profilePicture: e.target.value })}
              className="border px-4 py-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={newMember.status}
              onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
              className="border px-4 py-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              onClick={handleAddMember}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Member
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
