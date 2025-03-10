import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { OrderStats, RevenueData, DateRange } from '../types/reports';

export class ReportGenerator {
  private static formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  static generateCSV(revenueData: RevenueData[], stats: OrderStats, dateRange: DateRange): void {
    const headers = ['Date', 'Revenue'];
    const csvContent = [
      headers.join(','),
      ...revenueData.map(data => 
        [
          this.formatDate(data.date),
          data.revenue.toFixed(2)
        ].join(',')
      )
    ].join('\n');

    const summary = [
      '',
      'Summary',
      `Total Revenue,$${stats.totalRevenue.toFixed(2)}`,
      `Total Orders,${stats.totalOrders}`,
      `Average Order Value,$${stats.averageOrderValue.toFixed(2)}`,
      `Date Range,${this.formatDate(dateRange.startDate)} to ${this.formatDate(dateRange.endDate)}`
    ].join('\n');

    const fullReport = `${csvContent}\n${summary}`;
    this.downloadFile(fullReport, 'csv', dateRange);
  }

  static generatePDF(revenueData: RevenueData[], stats: OrderStats, dateRange: DateRange): void {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(20);
    pdf.text('Revenue Report', 14, 20);

    // Add date range
    pdf.setFontSize(12);
    pdf.text(`Date Range: ${this.formatDate(dateRange.startDate)} to ${this.formatDate(dateRange.endDate)}`, 14, 30);

    // Add summary statistics
    pdf.setFontSize(14);
    pdf.text('Summary', 14, 45);
    
    const summaryData = [
      ['Total Revenue', `$${stats.totalRevenue.toFixed(2)}`],
      ['Total Orders', stats.totalOrders.toString()],
      ['Average Order Value', `$${stats.averageOrderValue.toFixed(2)}`],
      ['Total Products', stats.totalProducts.toString()]
    ];

    autoTable(pdf, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'striped',
      headStyles: { fillColor: [66, 139, 202] }
    });

    // Add daily revenue data
    pdf.setFontSize(14);
    pdf.text('Daily Revenue', 14, pdf.lastAutoTable.finalY + 20);

    const tableData = revenueData.map(data => [
      this.formatDate(data.date),
      `$${data.revenue.toFixed(2)}`
    ]);

    autoTable(pdf, {
      startY: pdf.lastAutoTable.finalY + 25,
      head: [['Date', 'Revenue']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [66, 139, 202] }
    });

    pdf.save(`revenue-report-${dateRange.startDate}-to-${dateRange.endDate}.pdf`);
  }

  private static downloadFile(content: string, type: 'csv', dateRange: DateRange): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `revenue-report-${dateRange.startDate}-to-${dateRange.endDate}.${type}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}