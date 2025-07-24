import React, { useState, useEffect } from 'react';
import axios from 'axios';

const allowedCategories = [
  "Array", "String", "Math", "Basic Math", "Dynamic Programming", "Tree", "Graph",
  "Greedy", "Stack", "Queue", "Hash Table", "Heap",
  "Binary Search", "Binary Tree", "Binary Search Tree",
  "Binary Indexed Tree", "Segment Tree", "Trie",
  "Union Find", "Disjoint Set", "Recursion", "Hashing"
];

const AdminPanel = () => {
  const [userCount, setUserCount] = useState(null);
  const [form, setForm] = useState({
    problemNumber: '',
    title: '',
    description: '',
    difficulty: '',
    category: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    defaultCode: '',
    boilerplate: '',
    testCases: '',
    tags: '',
    companiesAskedIn: '',
    author: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/auth/count', { withCredentials: true })
      .then(res => setUserCount(res.data.count))
      .catch(() => setUserCount('Error'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      // Prepare data according to schema
      const payload = {
        problemNumber: Number(form.problemNumber),
        title: form.title,
        description: form.description,
        difficulty: form.difficulty,
        category: form.category,
        constraints: form.constraints.split('\n').map(s => s.trim()).filter(Boolean),
        sampleInput: form.sampleInput,
        sampleOutput: form.sampleOutput.split('\n').map(s => s.trim()).filter(Boolean),
        defaultCode: form.defaultCode ? JSON.parse(form.defaultCode) : {},
        boilerplate: form.boilerplate ? JSON.parse(form.boilerplate) : {},
        testCases: form.testCases ? JSON.parse(form.testCases) : [],
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
        companiesAskedIn: form.companiesAskedIn.split(',').map(s => s.trim()).filter(Boolean),
        author: form.author || 'admin',
      };
      await axios.post('/api/problems', payload, { withCredentials: true });
      setMessage('Problem created successfully!');
      setForm({
        problemNumber: '', title: '', description: '', difficulty: '', category: '', constraints: '', sampleInput: '', sampleOutput: '', defaultCode: '', boilerplate: '', testCases: '', tags: '', companiesAskedIn: '', author: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating problem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <div style={{ marginBottom: 32 }}>
        <strong>Total Users:</strong> {userCount === null ? 'Loading...' : userCount}
      </div>
      <h3 className="text-lg font-bold mb-2">Create Problem</h3>
      <form onSubmit={handleSubmit}>
        <label>Problem Number:<br />
          <input name="problemNumber" value={form.problemNumber} onChange={handleChange} required type="number" style={{ width: '100%' }} />
        </label><br /><br />
        <label>Title:<br />
          <input name="title" value={form.title} onChange={handleChange} required style={{ width: '100%' }} />
        </label><br /><br />
        <label>Description:<br />
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} style={{ width: '100%' }} />
        </label><br /><br />
        <label>Difficulty:<br />
          <select name="difficulty" value={form.difficulty} onChange={handleChange} required style={{ width: '100%' }}>
            <option value="">Select</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label><br /><br />
        <label>Category:<br />
          <select name="category" value={form.category} onChange={handleChange} required style={{ width: '100%' }}>
            <option value="">Select</option>
            {allowedCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </label><br /><br />
        <label>Constraints (one per line):<br />
          <textarea name="constraints" value={form.constraints} onChange={handleChange} rows={2} style={{ width: '100%' }} />
        </label><br /><br />
        <label>Sample Input:<br />
          <textarea name="sampleInput" value={form.sampleInput} onChange={handleChange} rows={2} style={{ width: '100%' }} />
        </label><br /><br />
        <label>Sample Output (one per line):<br />
          <textarea name="sampleOutput" value={form.sampleOutput} onChange={handleChange} rows={2} style={{ width: '100%' }} />
        </label><br /><br />
        <label>Default Code (JSON, language: code):<br />
          <textarea name="defaultCode" value={form.defaultCode} onChange={handleChange} rows={2} style={{ width: '100%' }} placeholder='{"python": "print(123)"}' />
        </label><br /><br />
        <label>Boilerplate (JSON, language: code):<br />
          <textarea name="boilerplate" value={form.boilerplate} onChange={handleChange} rows={2} style={{ width: '100%' }} placeholder='{"python": "def foo(): pass"}' />
        </label><br /><br />
        <label>Test Cases (JSON array):<br />
          <textarea name="testCases" value={form.testCases} onChange={handleChange} rows={2} style={{ width: '100%' }} placeholder='[{"input": 1, "output": 2}]' />
        </label><br /><br />
        <label>Tags (comma separated):<br />
          <input name="tags" value={form.tags} onChange={handleChange} style={{ width: '100%' }} />
        </label><br /><br />
        <label>Companies Asked In (comma separated):<br />
          <input name="companiesAskedIn" value={form.companiesAskedIn} onChange={handleChange} style={{ width: '100%' }} />
        </label><br /><br />
        <label>Author:<br />
          <input name="author" value={form.author} onChange={handleChange} style={{ width: '100%' }} placeholder='admin' />
        </label><br /><br />
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Creating...' : 'Create Problem'}
        </button>
      </form>
      {message && <div style={{ color: 'green', marginTop: 16 }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default AdminPanel; 