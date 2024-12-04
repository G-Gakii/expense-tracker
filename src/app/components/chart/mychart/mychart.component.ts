import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ExpenseService } from '../../../shared/expense.service';
import { Expense } from '../../../interface/expense';
Chart.register(...registerables);
@Component({
  selector: 'app-mychart',
  standalone: true,
  imports: [],
  templateUrl: './mychart.component.html',
  styleUrl: './mychart.component.scss',
})
export class MychartComponent implements OnInit {
  category!: { [key: string]: number };
  labelData: string[] = [];
  categoryData: number[] = [];
  color: string[] = ['green', 'yellow', 'maroon', 'blue', 'orange', 'pick'];
  private mychart: Chart | null = null;
  constructor(private ExpenseService: ExpenseService) {}
  ngOnInit(): void {
    this.ExpenseService.getUserExpenses();
    this.ExpenseService.getTotalExpensePerCategory().subscribe({
      next: (item) => {
        this.category = item;
        this.labelData = Object.keys(this.category);
        this.categoryData = Object.values(this.category);
        this.renderChart(this.labelData, this.categoryData, this.color);
      },
    });
  }

  renderChart(labelData: string[], categoryData: number[], color: string[]) {
    if (this.mychart) {
      this.mychart.destroy();
    }
    this.mychart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: labelData,
        datasets: [
          {
            data: categoryData,
            backgroundColor: color,
          },
        ],
      },
      options: {},
    });
  }
}
