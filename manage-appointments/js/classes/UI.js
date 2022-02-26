import { deleteQuote, loadingEdit } from '../functions.js';
import { container } from '../selectors';

class UI { 
    printAlert(message, type) {
        const div = document.createElement('div');

        div.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Add class for type
        if (type === 'error') {
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        }

        // Message 
        div.textContent = message;

        // Add to DOM
        document.querySelector('#contenido').insertBefore(div, document.querySelector('.agregar-cita'));

        // Delete alert after to 5 seconds
        setTimeout(() => {
            div.remove();
        }, 5000);
    }

    printQuotes({ quotes }) {
        // Clean html
        this.cleanHTML();
        
        quotes.forEach(q => {            
            const { id, pet, owner, phone, date, hour, symptom } = q;
    
            const divQuote = document.createElement('div');
            divQuote.classList.add('cita', 'p-3');
            divQuote.dataset.id = id;
    
            // Scripting of the elements of the quote
            const petP = document.createElement('h2');
            petP.classList.add('card-title', 'font-weight-bolder');
            petP.textContent = pet;
    
            // Owner
            const ownerP = document.createElement('p');
            ownerP.innerHTML = `
                <span class="font-weight-bolder">Propietario: ${ owner }</span>
            `;

            // Phone
            const phoneP = document.createElement('p');
            phoneP.innerHTML = `
                <span class="font-weight-bolder">Teléfono: ${ phone }</span>
            `;

            // Date
            const dateP = document.createElement('p');
            dateP.innerHTML = `
                <span class="font-weight-bolder">Fecha: ${ date }</span>
            `;

            // Hour
            const hourP = document.createElement('p');
            hourP.innerHTML = `
                <span class="font-weight-bolder">Hora: ${ hour }</span>
            `;

            // Symptom
            const symptomP = document.createElement('p');
            symptomP.innerHTML = `
                <span class="font-weight-bolder">Sintomas: ${ symptom }</span>
            `;

            // Button for delete this quote
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnDelete.onclick = () => deleteQuote(id);

            // Add button to edit
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-info', 'mr-2');
            btnEdit.innerHTML = 'Editar <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>';
            btnEdit.onclick = () => loadingEdit(q);

            // Add p at divQuote
            divQuote.appendChild(petP);
            divQuote.appendChild(ownerP);
            divQuote.appendChild(phoneP);
            divQuote.appendChild(dateP);
            divQuote.appendChild(hourP);
            divQuote.appendChild(symptomP);

            // Buttons
            divQuote.appendChild(btnDelete);
            divQuote.appendChild(btnEdit);
    
            // Add quotes in html
            container.appendChild(divQuote);
        });
    }

    cleanHTML() {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

export default UI;