import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../../api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard().then(data => {
      setLeaderboard(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-yellow-400">&#11088;</span> Leaderboard <span className="text-yellow-400">&#11088;</span>
      </h2>
      {loading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <span className="loader border-2 border-t-2 border-t-indigo-500 border-indigo-200 rounded-full w-8 h-8 animate-spin"></span>
          <span className="ml-3 text-lg text-gray-600">Loading leaderboard...</span>
        </div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-50">
              <th className="py-2 px-3 rounded-tl-lg">Rank</th>
              <th className="py-2 px-3">Username</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3 rounded-tr-lg">Solved</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 && (
              <tr><td colSpan={4} className="text-center py-6 text-gray-400">No data yet.</td></tr>
            )}
            {leaderboard.map((user, idx) => (
              <tr key={user.userId} className={idx < 3 ? 'bg-yellow-50 font-bold' : ''}>
                <td className="py-2 px-3 text-center">{idx + 1}</td>
                <td className="py-2 px-3">{user.username}</td>
                <td className="py-2 px-3">{user.firstName} {user.lastName}</td>
                <td className="py-2 px-3 text-center">{user.solvedCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-6 text-center text-sm text-gray-400">Top 50 users by unique problems solved</div>
    </div>
  );
};

export default Leaderboard; 