import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DollarSign, TrendingUp, Package, ShoppingCart, Calendar, Download, FileText } from 'lucide-react';
import { OrderStats, RevenueData, DateRange } from '../types/reports';
import { ReportGenerator } from '../utils/ReportGenerator';

export function AdminOrderRevenue() {
  const [stats, setStats] = useState<OrderStats>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalProducts: 0,
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchOrderStats();
    fetchRevenueData();
  }, [dateRange]);

  async function fetchOrderStats() {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('total')
        .gte('created_at', `${dateRange.startDate}T00:00:00`)
        .lte('created_at', `${dateRange.endDate}T23:59:59`);

      if (orderError) throw orderError;

      const totalRevenue = orderData?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
      const totalOrders = orderData?.length || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const { count: totalProducts, error: productError } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      if (productError) throw productError;

      setStats({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        totalProducts: totalProducts || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order statistics');
    }
  }

  async function fetchRevenueData() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('total, created_at')
        .gte('created_at', `${dateRange.startDate}T00:00:00`)
        .lte('created_at', `${dateRange.endDate}T23:59:59`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const revenueByDate = (data || []).reduce((acc: { [key: string]: number }, order) => {
        const date = new Date(order.created_at!).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + Number(order.total);
        return acc;
      }, {});

      const allDates: RevenueData[] = [];
      const currentDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        allDates.push({
          date: dateStr,
          revenue: revenueByDate[dateStr] || 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setRevenueData(allDates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch revenue data');
    } finally {
      setLoading(false);
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const setLastDays = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setDateRange({
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLastDays(7)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Last 7 days
                </button>
                <button
                  onClick={() => setLastDays(30)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => setLastDays(90)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Last 90 days
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => ReportGenerator.generateCSV(revenueData, stats, dateRange)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              CSV Report
            </button>
            <button
              onClick={() => ReportGenerator.generatePDF(revenueData, stats, dateRange)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-4 w-4" />
              PDF Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.averageOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
        <div className="h-64 flex items-end gap-2">
          {revenueData.map((data) => {
            const height = `${(data.revenue / Math.max(...revenueData.map(d => d.revenue), 1)) * 100}%`;
            return (
              <div
                key={data.date}
                className="flex-1 flex flex-col items-center group"
                title={`${data.date}: $${data.revenue.toFixed(2)}`}
              >
                <div className="w-full bg-blue-100 group-hover:bg-blue-200 transition-colors relative" style={{ height }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${data.revenue.toFixed(2)}
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                  {new Date(data.date).toLocaleDateString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}