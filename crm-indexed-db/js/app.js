// IIFE: Expresión de función ejecutada inmediatamente
(function() {
    const list = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        createDB();

        if (window.indexedDB.open('crm')) {
            readClients();
        }

        list.addEventListener('click', deleteData);
    });

    // Create database of Indexed DB
    function createDB() {
        const db = window.indexedDB.open('crm', 1);

        db.onerror = function() {
            console.log('Hubo un error.');
        }

        db.onsuccess = function() {
            DB = db.result;
        }

        db.onupgradeneeded = function(e) {
            const dbEvent = e.target.result;
            const objectStore = dbEvent.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            // Columns
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('phone', 'phone', { unique: false });
            objectStore.createIndex('company', 'company', { unique: false });

            console.log('DB Ready and created!');
        }
    }

    // Get clients in Indexed DB
    function readClients() {
        const connection = window.indexedDB.open('crm', 1);

        connection.onsuccess = function() {
            DB = connection.result;
            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;

                if (cursor) {
                    const { id, name, email, phone, company } = cursor.value;
                    list.innerHTML += ` 
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">                                
                                <p class="text-sm leading-10 text-gray-700"> ${ id } </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${ name } </p>
                                <p class="text-sm leading-10 text-gray-700"> ${ email } </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${ phone }</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${ company }</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${ id }" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-id="${ id }" class="text-red-600 hover:text-red-900 delete">Eliminar</a>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                } else {
                    console.log('Sin mas registros...');
                }
            }
        }

        connection.onerror = function() {
            console.log('Error al leer los clients.');
        }
    }

    function deleteData(e) {
        if (e.target.classList.contains('delete')) {            
            const id = Number(e.target.dataset.id);

            // Alert to confirm
            const response = confirm('¿Deseas eliminar este cliente?');
            if (response) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(id);

                transaction.oncomplete = function() {                    
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('No se pudo eliminar correctamente.');
                }
            }
        }
    }

})();