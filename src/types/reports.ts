export interface OrderStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalProducts: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}