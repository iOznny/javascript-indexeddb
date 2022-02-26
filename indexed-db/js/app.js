let DB;

document.addEventListener('DOMContentLoaded', () => {
    crmDB();

    setTimeout(() => {
        createClient();
    }, 5000);
});

function crmDB() {
    // Database create version 1.0
    let crmDB = window.indexedDB.open('crm', 1);

    // Database created successful
    crmDB.onsuccess = function() {
        console.log('Base de datos creada.');
        DB = crmDB.result;
    }

    // Database failed
    crmDB.onerror = function() {
        console.log('Ocurrio un error al crear la base de datos.');
    }

    // Database configurations.
    crmDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        // Object Store
        const objectStore = db.createObjectStore('crm', {
            keyPath: 'crm',
            autoIncrement: true
        });

        // Define Columns
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('surname', 'surname', { unique: false });
        objectStore.createIndex('phone', 'phone', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });

        console.log('¡Columns created!');
    }
}

function createClient() {
    let transaction = DB.transaction(['crm'], 'readwrite');

    transaction.oncomplete = function() {
        console.log('Transaction complete.');
    }

    transaction.onerror = function() {
        console.log('Error in transaction.');
    }

    const objectStore = transaction.objectStore('crm');
    const newClient = {
        name: 'Demo',
        surname: 'Demo',
        phone: '1234567890',
        email: 'demo@indexeddb.com'
    };

    // Add client to indexeddb
    const request = objectStore.add(newClient);

    /**
     * add - Agregar
     * put - Actualizar
     * delete - Eliminar
    */

    console.log(request);
}