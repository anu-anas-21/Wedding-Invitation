'use client';

import { useMemo, useState } from 'react';
import type { RsvpRow } from '@/lib/types';

type CoupleFilter = 'All' | 'Musfir & Fasna' | 'Fasil & Rinshana' | 'Both Couples';
type AttendanceFilter = 'All' | 'Will Attend' | 'Unable to Attend';

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
  const headers = ['Name', 'Contact', 'Couple', 'Attendance', 'Guests', 'Wishes', 'Submitted At'];
  const csvRows = rows.map((r) =>
    [
      r.name,
      r.contact,
      r.couple,
      r.attendance,
      r.guest_count,
      (r.wishes ?? '').replace(/"/g, '""'),
      formatDate(r.created_at),
    ]
      .map((v) => `"${v}"`)
      .join(','),
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
  const [coupleFilter, setCoupleFilter] = useState<CoupleFilter>('All');
  const [attendanceFilter, setAttendanceFilter] = useState<AttendanceFilter>('All');

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (coupleFilter !== 'All' && r.couple !== coupleFilter) return false;
      if (attendanceFilter !== 'All' && r.attendance !== attendanceFilter) return false;
      return true;
    });
  }, [rows, coupleFilter, attendanceFilter]);

  const stats = useMemo(() => {
    const attending = filtered.filter((r) => r.attendance === 'Will Attend');
    const notAttending = filtered.filter((r) => r.attendance === 'Unable to Attend');
    const totalGuests = attending.reduce(
      (sum, r) => sum + parseInt(r.guest_count, 10) + 1,
      0,
    );
    return {
      total: filtered.length,
      attending: attending.length,
      notAttending: notAttending.length,
      totalGuests,
    };
  }, [filtered]);

  return (
    <>
      <div className="stat-cards">
        <div className="stat-card glass">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total RSVPs</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{stats.attending}</div>
          <div className="stat-label">Will Attend</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{stats.notAttending}</div>
          <div className="stat-label">Unable to Attend</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-value">{stats.totalGuests}</div>
          <div className="stat-label">Total Guest Count</div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filter-group">
          <label htmlFor="couple-filter">Couple</label>
          <select
            id="couple-filter"
            className="admin-select"
            value={coupleFilter}
            onChange={(e) => setCoupleFilter(e.target.value as CoupleFilter)}
          >
            <option value="All">All</option>
            <option value="Musfir & Fasna">Musfir &amp; Fasna</option>
            <option value="Fasil & Rinshana">Fasil &amp; Rinshana</option>
            <option value="Both Couples">Both Couples</option>
          </select>
        </div>

        <div className="admin-filter-group">
          <label htmlFor="attendance-filter">Attendance</label>
          <select
            id="attendance-filter"
            className="admin-select"
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value as AttendanceFilter)}
          >
            <option value="All">All</option>
            <option value="Will Attend">Will Attend</option>
            <option value="Unable to Attend">Unable to Attend</option>
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
              <th>Name</th>
              <th>Contact</th>
              <th>Couple</th>
              <th>Attendance</th>
              <th>Guests</th>
              <th>Wishes</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  No RSVPs match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.contact}</td>
                  <td>{row.couple}</td>
                  <td className={row.attendance === 'Will Attend' ? 'attending' : 'not-attending'}>
                    {row.attendance}
                  </td>
                  <td>{row.guest_count}</td>
                  <td>{row.wishes || '—'}</td>
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
