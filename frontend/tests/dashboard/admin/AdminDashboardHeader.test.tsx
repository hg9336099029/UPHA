import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboardHeader from '@/app/dashboard/admin/AdminDashboardHeader';

describe('AdminDashboardHeader Component', () => {
  it('renders the main title and badge', () => {
    render(<AdminDashboardHeader />);
    
    expect(screen.getByText('ADMIN DASHBOARD')).toBeInTheDocument();
    expect(screen.getByText('FEDERATION OFFICE')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
    expect(screen.getByText('REVIEWS')).toBeInTheDocument();
  });

  it('renders all four statistical metric cards', () => {
    render(<AdminDashboardHeader />);
    
    expect(screen.getByText('TOTAL PENDING')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('APPROVED TODAY')).toBeInTheDocument();
  });
});
