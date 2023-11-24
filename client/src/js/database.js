import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

const DB_NAME = 'jate';
const STORE_NAME = 'jate';

export const putDb = async (content) => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put({ content });
  await tx.complete;
  console.log('Content added to IndexedDB');
};

export const getDb = async () => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const data = await store.getAll();
  await tx.complete;
  return data.map(item => item.content);
};

initdb();
