import { GetAllStudentsAPI } from "../Services/AllAPI";
import Table from "./Table";
import Header from "../Components/Header";

const Dashboard = () => {
 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Quyl.</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-200 cursor-pointer flex items-center">
              <span className="mr-2"><i class="fa-solid fa-gauge-high"></i></span> Dashboard
            </li>
            <li className="px-6 py-3 bg-gray-200 font-semibold text-gray-900 flex items-center">
              <span className="mr-2"><i class="fa-solid fa-book"></i></span> Students
            </li>
            <li className="px-6 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center">
              <span className="mr-2"><i class="fa-solid fa-book-open"></i></span> Chapter
            </li>
            <li className="px-6 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center">
              <span className="mr-2"><i class="fa-solid fa-question"></i></span> Help
            </li>
            <li className="px-6 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center">
              <span className="mr-2"><i class="fa-solid fa-chart-pie"></i></span> Report
            </li>
            <li className="px-6 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center">
              <span className="mr-2"><i class="fa-solid fa-gear"></i></span> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
          <Header/>

        {/* Table */}
          <Table/>
      </div>
    </div>
  );
};

export default Dashboard;
