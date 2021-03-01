import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDB() {
  return open({
    filename: './data_viewer.db',
    driver: sqlite3.Database,
  });
}

export default openDB;
