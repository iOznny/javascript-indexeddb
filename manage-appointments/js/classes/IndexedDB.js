import UI from './UI.js';

// DB Reference
let DB;
const ui = new UI();

class IndexedDB {
    // Create IndexedDB
    createDB() {
        // Database create version 1.0
        const createDB = window.indexedDB.open('quotes', 1);

        // Database created successful
        createDB.onsuccess = () => {
            console.log('Base de datos creada.'); 
            DB = createDB.result;  

            // Show quotes at loading            
            this.readQuotes();
        }

        // Database failed
        createDB.onerror = function() {
            console.log('Ocurrio un error al crear la base de datos.');
        }

        // Define schema of database or configurations
        createDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            // Object Store
            const objectStore = db.createObjectStore('quotes', {
                keyPath: 'id',
                autoincrement: true                
            });

            // Define Columns
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('pet', 'pet', { unique: false });
            objectStore.createIndex('owner', 'owner', { unique: false });
            objectStore.createIndex('phone', 'phone', { unique: false });
            objectStore.createIndex('date', 'date', { unique: false });
            objectStore.createIndex('hour', 'hour', { unique: false });
            objectStore.createIndex('symptom', 'symptom', { unique: false });

            console.log('¡Columns created!');
        }
    }

    // Create new Quote
    createQuote(objectQuote) {        
        // Insert in indexedDB
        const transaction = DB.transaction(['quotes'], 'readwrite');

        // Enable of objectStore
        const objectStore = transaction.objectStore('quotes');

        // Insert in the database
        objectStore.add(objectQuote);

        transaction.oncomplete = () => {            
            ui.printAlert('Cita agregada exitosamente.');
        }
    
        transaction.onerror = () => {            
            ui.printAlert('No se pudo agregar la cita.');
        }
    }

    // Read quotes
    readQuotes() {
        // Read to content of database
        const objectStore = DB.transaction('quotes').objectStore('quotes');

        const total = objectStore.count();
        total.onsuccess = function() {
            console.log(total.result);
        }

        // Iterar IndexedDB
        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;

            if (cursor) {                
                ui.printQuotes(cursor);
            }
        }
    }

    editQuotes(objectQuote) {
        const transaction = DB.transaction(['quotes'], 'readwrite');
        const objectStore = transaction.objectStore('quotes');

        // Edit
        objectStore.put(objectQuote);

        transaction.oncomplete = () => {
            ui.printAlert('Editado correctamente.');
        }

        transaction.onerror = () => {
            ui.printAlert('No se pudo editar correctamente.');            
        }
    }

    deleteQuote(id) {
        const transaction = DB.transaction(['quotes'], 'readwrite');
        const objectStore = transaction.objectStore('quotes');

        // Delete
        objectStore.delete(id);

        transaction.oncomplete = () => {
            ui.printAlert('Cita eliminada correctamente.');
            this.readQuotes();
        }

        transaction.onerror = () => {            
            console.log('No se pudo eliminar la cita.');
        }
    }
    
}

export default IndexedDB;