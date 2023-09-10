import { Component } from '@angular/core';
import { TestdataService } from 'src/app/services/testdata.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-test-primeng-datatable',
  templateUrl: './test-primeng-datatable.component.html',
  styleUrls: ['./test-primeng-datatable.component.scss']
})
export class TestPrimengDatatableComponent {
  products!: any[];
  cols!: any[];
  exportColumns!: any[];

    constructor(private productService: TestdataService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.cols = [
          { field: 'code', header:'مؤسسة نخبة رية' },
          { field: 'name', header: 'bqens' },
          { field: 'category', header: 'cs' },
          { field: 'quantity', header: 'zop' },
          { field: 'name', header: 'ow' },
          { field: 'id', header: '3t' }
      ];
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }))
    }

    exportExcel() {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.products);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, 'products');
      });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
exportPdf() {
  import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
          const doc = new jsPDF.default('p', 'px', 'a4');
          doc.addFileToVFS('Tahoma Regular font-normal.ttf',this.productService.font);
          doc.addFont(
            'Tahoma Regular font-normal.ttf',
            'Tahoma Regular font',
            'normal'
          );
          doc.setFont('Tahoma Regular font-normal.ttf');

        
          (doc as any).autoTable({
            columns:this.exportColumns,
            body:this.products,
            styles:{
              font:'Tahoma Regular font'
            }
          });
          doc.save('products.pdf');
      });
  });
}
}