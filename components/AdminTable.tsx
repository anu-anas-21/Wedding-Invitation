'use client';

import { useMemo, useState } from 'react';
import type { RsvpRow } from '@/lib/types';

type AttendanceFilter = 'All' | 'Will come' | 'Will not come';

interface AdminTableProps {
  rows: RsvpRow[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function exportCsv(rows: RsvpRow[]): void {
  const headers = ['Attendance', 'Submitted At'];
  const csvRows = rows.map((r) =>
    [r.attendance, formatDate(r.created_at)].map((v) => `"${v}"`).join(','),
  );

  const blob = new Blob([[headers.join(','), ...csvRows].join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminTable({ rows }: AdminTableProps) {
  const [attendanceFilter, setAttendanceFilter] = useState<AttendanceFilter>('All');

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (attendanceFilter !== 'All' && r.attendance !== attendanceFilter) return false;
      return true;
    });
  }, [rows, attendanceFilter]);

  const stats = useMemo(() => {
    const coming = filtered.filter((r) => r.attendance === 'Will come');
    const notComing = filtered.filter((r) => r.attendance === 'Will not come');
    return {
      total: filtered.length,
      coming: coming.length,
      notComing: notComing.length,
    };
  }, [filtered]);

  return (
    <>
      <div className="stat-cards">
        <div className="stat-card glass">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Responses</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{stats.coming}</div>
          <div className="stat-label">Will come</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{stats.notComing}</div>
          <div className="stat-label">Will not come</div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filter-group">
          <label htmlFor="attendance-filter">Attendance</label>
          <select
            id="attendance-filter"
            className="admin-select"
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value as AttendanceFilter)}
          >
            <option value="All">All</option>
            <option value="Will come">Will come</option>
            <option value="Will not come">Will not come</option>
          </select>
        </div>

        <button
          type="button"
          className="admin-export-btn"
          onClick={() => exportCsv(filtered)}
        >
          Export CSV
        </button>
      </div>

      <div className="admin-table-wrap glass">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Attendance</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center', padding: '2rem' }}>
                  No responses match the current filter.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td className={row.attendance === 'Will come' ? 'attending' : 'not-attending'}>
                    {row.attendance}
                  </td>
                  <td>{formatDate(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
