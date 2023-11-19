import { openDB } from "idb";

const initdb = async () => {
  try {
    const db = await openDB("jate", 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains("jate")) {
          console.log("jate database already exists");
          return;
        }
        db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
        console.log("jate database created");
      },
    });
    console.log("Database initialized successfully");
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export const putDb = async (content) => {
  try {
    const textDb = await initdb();
    const text = textDb.transaction("jate", "readwrite");
    const store = text.objectStore("jate");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log("Saved to the database", result);
  } catch (error) {
    console.error("Error putting data into the database:", error);
  }
};

export const getDb = async () => {
  try {
    const textDb = await initdb();
    const text = textDb.transaction("jate", "readonly");
    const store = text.objectStore("jate");
    const request = store.get(1);
    const result = await request;
    console.log("result.value", result);
    return result?.value;
  } catch (error) {
    console.error("Error getting data from the database:", error);
    throw error;
  }
};

// Initialize the database when this module is loaded
initdb();
