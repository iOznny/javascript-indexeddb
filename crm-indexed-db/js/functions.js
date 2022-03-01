let DB;
const form = document.querySelector('#formulario')

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

// Print Alert
function printAlert(message, type) {
    const alert = document.querySelector('.alert');

    if (!alert) {
        const div = document.createElement('div');
        div.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alert');

        if (type === 'success') {
            div.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        } else {
            div.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }

        div.textContent = message;
        form.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}