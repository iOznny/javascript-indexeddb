// IIFE: Expresión de función ejecutada inmediatamente
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        connectionDB();
        form.addEventListener('submit', validateClient);
    });

    // Connenction DB
    function connectionDB() {
        const connection = window.indexedDB.open('crm', 1);

        connection.onerror = function() {
            console.log('Error al conectar con la DB');
        }
        
        connection.onsuccess = function() {
            DB = connection.result;
        }
    }

    // Validate Client
    function validateClient(e) {
        e.preventDefault();

        // Read inputs
        const name = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#telefono').value;
        const company = document.querySelector('#empresa').value;

        if (name === '' || email === '' || phone === '' || company === '') {            
            printAlert('Todos los campos son obligatorios.', 'error');
            return;
        }

        // Create object with the information
        const client = {
            id: Date.now(),
            name,
            email,
            phone,
            company
        };

        createClient(client);
    }

    // Create new Client
    function createClient(client) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(client);

        transaction.oncomplete = function() {
            printAlert('Cliente agregado correctamente.', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }

        transaction.onerror = function() {
            printAlert('No se pudo agregar el cliente.', 'error');            
        }
    }

})();