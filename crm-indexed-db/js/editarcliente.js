(function() {
    let id;
    const nameIpt = document.querySelector('#nombre');
    const emailIpt = document.querySelector('#email');
    const phoneIpt = document.querySelector('#telefono');
    const companyIpt = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', () => {
        connectionDB();

        // Checking if of the URL.
        const params = new URLSearchParams(window.location.search);        
        id = params.get('id');
        
        if (id) {
            setTimeout(() => {
                getClient(id);
            }, 100);
        }

        // Update client
        form.addEventListener('submit', updateClient);
    });

    // Get client in Indexed DB
    function getClient(id) {
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');
        
        // Iterar Indexed DB
        const client = objectStore.openCursor();
        
        client.onsuccess = function(e) {
            const cursor = e.target.result;

            if (cursor) {                
                if (cursor.value.id === Number(id)) {
                    fillForm(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    // Fill Form
    function fillForm(client) {
        const { name, email, phone, company } = client;
        nameIpt.value = name;
        emailIpt.value = email;
        phoneIpt.value = phone;
        companyIpt.value = company;
    }

    // Update Client
    function updateClient(e) {
        e.preventDefault();

        if (nameIpt.value === '' || emailIpt.value === '' || phoneIpt.value === '' || companyIpt.value === '' ) {
            printAlert('Todos los campos son obligatorios.', 'error');
            return;
        }

        // Update Client
        const clientUpdate = {
            id: Number(id),
            name: nameIpt.value,
            email: emailIpt.value,
            phone: phoneIpt.value,
            company: companyIpt.value,
        }

        // Update
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clientUpdate);

        transaction.oncomplete = function() {
            printAlert('Cliente editaco correctamente.', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }

        transaction.onerror = function() {
            printAlert('No se pudo realizas la actualización.', 'error');
        }
    }

})();