import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-report-app';

  downloadPDF() {
    const pdfUrl = 'assets/relatorio.pdf'; // URL do PDF
    const pdfName = 'relatorio.pdf';

    // Fetch o PDF e salva-o
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, pdfName);
      })
      .catch(error => {
        console.error('Erro ao baixar o PDF:', error);
      });
  }
}
