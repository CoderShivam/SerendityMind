/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { submitPHQ9 } from "../apiService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PieChart from "../components/PieChart";

const PHQ9 = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Toggle flag for triggering PieChart refresh
  const [refreshPie, setRefreshPie] = useState(false);
  const [severity, setSeverity] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please Login or Sign Up");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [user, navigate]);

  // Questions & Options arrays
  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself — or that you are a failure or let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead or of hurting yourself in some way?",
  ];

  const answerOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ];

  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [date] = useState(new Date().toISOString().split("T")[0]);

  const calculateSeverity = (score) => {
    if (score <= 4) return "Minimal or None";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately Severe";
    return "Severe";
  };

  const handleSubmit = async () => {
    try {
      if (!user?._id || !user?.token) {
        toast.error("Please Login or Sign Up");
        navigate("/login");
        return;
      }

      const score = responses.reduce((a, b) => a + b, 0);
      const severityLevel = calculateSeverity(score);
      await submitPHQ9(user._id, date, responses, user.token);

      setSeverity(severityLevel);
      setShowModal(true);
      setRefreshPie((prev) => !prev); // 🔁 refresh chart
      toast.success("Response saved successfully");
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-7">
      <ToastContainer />
      <h1 className="md:text-4xl text-lg font-bold mb-6 text-cyan-400 text-center">
        PHQ-9 Assessment: Depression Severity Check
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
        {/* Questions Section */}
        <div className="md:col-span-8 p-5 shadow-lg shadow-pink-400 bg-neutral-950 rounded-lg">
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium mb-2 text-sky-400">
                {index + 1}. {q}
              </p>
              <div className="flex flex-wrap gap-4">
                {answerOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`cursor-pointer p-2 border rounded-lg ${
                      responses[index] === opt.value
                        ? "bg-blue-500 text-white"
                        : "bg-neutral-900 text-white"
                    }`}
                    onClick={() => {
                      const newRes = [...responses];
                      newRes[index] = opt.value;
                      setResponses(newRes);
                    }}
                  >
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} className="btn btn-active btn-secondary">
            Submit Responses
          </button>
        </div>

        {/* Chart Section */}
        <div className="md:col-span-4 h-screen flex items-center">
          <PieChart refresh={refreshPie} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-neutral-800 text-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Depression Severity</h2>
            <p className="text-xl font-bold mb-2">{severity}</p>
            <p className="text-sm text-gray-400">
              Date: <span className="font-medium text-gray-300">{date}</span>
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
              >
                Close
              </button>
            </div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-3 shadow-md">
              {/* ✅ success icon */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PHQ9;
