import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Career, listCareers, createCareer, updateCareer, deleteCareer } from '@/services/careers';

const emptyCareer: Career = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  level: 'Mid Level',
  description: [],
  isActive: true,
};

export default function Careers() {
  const [items, setItems] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Career | null>(null);
  const [form, setForm] = useState<Career>(emptyCareer);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listCareers();
      setItems(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing && editing._id) {
        await updateCareer(editing._id, form);
      } else {
        await createCareer(form);
      }
      setForm(emptyCareer);
      setEditing(null);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Save failed');
    }
  };

  const startEdit = (item: Career) => {
    setEditing(item);

    let parsedDescription: { heading: string; content: string }[] = [];
    let descStrToParse = '';

    // Check if it's already a valid structured array
    if (Array.isArray(item.description)) {
      if (item.description.length > 0) {
        const first = item.description[0] as any;
        if (first && typeof first === 'object' && ('heading' in first || 'content' in first) && !('0' in first)) {
          // Seems like valid new data
          parsedDescription = item.description;
        } else {
          // It's likely legacy data mangled by Mongoose casting
          // Case 1: Array of chars or strings?
          // Case 2: Array containing one object with numeric keys?

          // Reconstruct from numeric keys if present
          if (typeof first === 'object') {
            const keys = Object.keys(first).filter(k => !isNaN(Number(k))).sort((a, b) => Number(a) - Number(b));
            if (keys.length > 0) {
              descStrToParse = keys.map(k => first[k]).join('');
            } else {
              // Try straight string join if array of strings
              if (item.description.every(x => typeof x === 'string')) {
                descStrToParse = (item.description as any).join('');
              }
            }
          } else if (typeof first === 'string') {
            // Try joining array of strings
            descStrToParse = (item.description as any).join('');
          }
        }
      }
    } else {
      // Single string case
      descStrToParse = (item.description as any as string) || '';
    }

    // If we haven't found a structured description yet, try to parse the string
    if (parsedDescription.length === 0) {
      const descStr = descStrToParse || (item.description as any as string) || '';

      // Known headers to look for (case-insensitive)
      const knownHeaders = [
        "Role Overview", "Key Responsibilities", "Education & Qualification",
        "Education", "Experience", "Skills & Competencies",
        "Professional Experience", "Technical skills", "Languages",
        "Language & Mobility", "What We Offer", "How to Apply", "Job Description"
      ];

      const lines = descStr.split('\n');
      let currentSection = { heading: 'Description', content: '' };

      for (const line of lines) {
        const trimmed = line.trim();
        // Check if line looks like a header (short, matches keywords, or ends in colon)
        const headerMatch = knownHeaders.find(h =>
          trimmed.toLowerCase().replace(':', '') === h.toLowerCase().replace(':', '')
        );

        if (headerMatch) {
          // If we have content in the current section, push it
          if (currentSection.content.trim()) {
            parsedDescription.push(currentSection);
          }
          // Start a new section
          currentSection = { heading: line.replace(':', '').trim(), content: '' };
        } else {
          currentSection.content += (currentSection.content ? '\n' : '') + line;
        }
      }

      // Push the last section
      if (currentSection.content.trim() || parsedDescription.length === 0) {
        parsedDescription.push(currentSection);
      }
    }

    setForm({
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      level: item.level,
      description: parsedDescription,
      isActive: item.isActive,
    });
  };

  const remove = async (item: Career) => {
    if (!item._id) return;
    if (!confirm('Delete this career?')) return;
    try {
      await deleteCareer(item._id);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Delete failed');
    }
  };


  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Careers
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Manage job postings and career opportunities.
        </p>
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12, fontWeight: 600 }}>{editing ? 'Edit Career' : 'Add Career'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
          </div>
          <div>
            <label>Department</label>
            <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
          </div>
          <div>
            <label>Location</label>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
          </div>
          <div>
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}>
              {['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label>Level</label>
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}>
              {['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager', 'Director'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151' }}>Description Sections</label>
              <span style={{ fontSize: '0.85em', color: '#6b7280' }}>({form.description.length} sections)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {form.description.map((section, index) => (
                <div key={index} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: 16,
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: 4 }}>
                        Heading <span style={{ color: '#000', fontWeight: 'bold' }}>(Black)</span>
                      </label>
                      <input
                        value={section.heading}
                        onChange={(e) => {
                          const newDesc = [...form.description];
                          newDesc[index].heading = e.target.value;
                          setForm({ ...form, description: newDesc });
                        }}
                        placeholder="e.g. Responsibilities"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: 6,
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#111827'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: 4 }}>
                        Content <span style={{ color: '#6b7280', fontWeight: 'bold' }}>(Grey)</span>
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) => {
                          const newDesc = [...form.description];
                          newDesc[index].content = e.target.value;
                          setForm({ ...form, description: newDesc });
                        }}
                        placeholder="Details about this section..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: 6,
                          fontSize: '0.95rem',
                          color: '#4b5563',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#111827'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newDesc = form.description.filter((_, i) => i !== index);
                      setForm({ ...form, description: newDesc });
                    }}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      border: 'none',
                      background: 'transparent',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: 4,
                      fontSize: '1.2rem',
                      lineHeight: 1,
                      opacity: 0.6
                    }}
                    title="Remove section"
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
                  >
                    &times;
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setForm({ ...form, description: [...form.description, { heading: '', content: '' }] })}
                style={{
                  padding: '10px',
                  border: '1px dashed #d1d5db',
                  borderRadius: 8,
                  backgroundColor: '#f9fafb',
                  color: '#4b5563',
                  fontWeight: 500,
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.borderColor = '#9ca3af'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
              >
                + Add New Section
              </button>
            </div>
          </div>
          <div>
            <label>
              <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active
            </label>
          </div>
          <div style={{ alignSelf: 'end', justifySelf: 'end' }}>
            <button type="button" onClick={() => { setEditing(null); setForm(emptyCareer); }} style={{ marginRight: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db' }}>Clear</button>
            <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white' }}>{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'crimson' }}>{error}</div>
      ) : (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Title', 'Department', 'Location', 'Type', 'Level', 'Active', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.title}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.department}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.location}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.type}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.level}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.isActive ? 'Yes' : 'No'}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                    <button onClick={() => startEdit(item)} style={{ marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}>Edit</button>
                    <button onClick={() => remove(item)} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

