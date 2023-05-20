import csv from 'csv-parser';
import fs from 'fs';
import {promisify} from 'util';
import stream from 'stream';

const pipeline = promisify(stream.pipeline);

export interface CSVPlan {
    account_name: string;
    percentage: number;
}

export async function parseCSV(csvFilePath: string): Promise<CSVPlan[]> {
    let results: CSVPlan[] = [];

    await pipeline(
        fs.createReadStream(csvFilePath),
        csv(),
        new stream.Writable({
            objectMode: true,
            write(data: CSVPlan, _encoding, callback) {
                results.push(data);
                callback();
            }
        })
    );

    return results;
}
