import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import { resolve } from 'path';
import Handlebars from 'handlebars';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async printPDF() {
    // Path file
    const path = 'solicitud-nacimiento/no-encontrado.hbs';

    // Some data test
    const data = { message: 'Mensaje de prueba', id: 1, name: 'Some name' };

    const pdfFile = this.generatePdf(path);
    
    return pdfFile;
  }

  async generatePdf<T>(pathFile: string, data?: T) {
    console.log(data);

    // Create a browser instance
    const browser = await puppeteer.launch({ headless: true });

    // Create a new page
    const page = await browser.newPage();

    //Get HTML content from HTML file
    const html = this.getHtmlTemplate(pathFile, data);

    // Set the content of the page
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Take a snapshot of the PDF
    const pdf = await page.pdf({
      format: 'A4',
      displayHeaderFooter: false,
      printBackground: true,
    });

    // Close the browser instance
    await browser.close();
    return pdf;
  }

  getHtmlTemplate<T>(path: string, data?: T): string {
    // getting the template
    
    const templateDir = resolve(__dirname, 'views', path);
    const file = fs.readFileSync(templateDir, 'utf-8');

    // compiling
    const fileCompiled = Handlebars.compile(file);

    // getting the template in string
    const fileHTML = fileCompiled({ ...data });
    return fileHTML;
  }
}
