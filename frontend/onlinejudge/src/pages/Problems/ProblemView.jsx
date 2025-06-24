import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProblemByNumber } from '../../api'; // Make sure this function calls using problemNumber

const ProblemView = () => {
  const { problemNumber } = useParams(); // ✅ get `problemNumber` instead of `id`
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const loadProblem = async () => {
      const data = await fetchProblemByNumber(problemNumber); // ✅ use problemNumber
      if (data.error) {
        setError(data.error);
      } else {
        setProblem(data);
      }
    };
    loadProblem();
  }, [problemNumber]);

  const handleRun = () => {
    setOutput('Running your code...\n(Compiler integration coming soon!)');
  };

  const handleSubmit = () => {
    setOutput('Submitting your solution...\n(Submission evaluation coming soon!)');
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!problem) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">{problem.title}</h1>
      <p className="mb-6 text-gray-300 whitespace-pre-line">{problem.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-400">Test Cases</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-400">
          {problem.testCases?.map((tc, idx) => (
            <li key={idx}>
              <span className="font-semibold">Input:</span> {tc.input} <br />
              <span className="font-semibold">Output:</span> {tc.output}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-indigo-400">Your Code</h2>
        <textarea
          className="w-full h-64 p-3 bg-gray-900 border border-gray-700 rounded-md font-mono text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="mt-4 space-x-4">
        <button
          onClick={handleRun}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-md transition font-semibold"
        >
          Run
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md transition font-semibold"
        >
          Submit
        </button>
      </div>

      {output && (
        <pre className="mt-6 bg-gray-800 p-4 rounded-md whitespace-pre-wrap text-gray-300">
          {output}
        </pre>
      )}
    </div>
  );
};

export default ProblemView;
