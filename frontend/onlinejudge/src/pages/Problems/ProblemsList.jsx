import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProblems } from '../../api'; // import from your api.js

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProblems = async () => {
      const data = await fetchProblems();
      if (data.error) {
        setError(data.error);
      } else {
        setProblems(data);
      }
    };
    loadProblems();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Problems</h1>
      <ul className="divide-y divide-gray-700">
        {problems.map((problem, index) => (
          <li key={problem.problemNumber} className="py-4 hover:bg-gray-800 rounded-md transition">
            <Link
              to={`/problems/${problem.problemNumber}`}
              className="text-white text-lg font-medium hover:text-indigo-400"
            >
              {index + 1}. {problem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemsList;
