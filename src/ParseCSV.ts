import fs from 'fs';
import csv from 'csv-parser';

export interface CSVRow {
    account_name: string;
    percentage: string;
}

export function parseCSV(filename: string): Promise<CSVRow[]> {
    const results: CSVRow[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => results.push(data as CSVRow))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}
