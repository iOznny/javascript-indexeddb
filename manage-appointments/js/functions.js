import Quote from './classes/Quote.js';
import UI from './classes/UI.js';
import IndexedDB from './classes/IndexedDB.js';
import { 
    petInput, 
    ownerInput, 
    phoneInput, 
    dateInput, 
    hourInput, 
    symptomInput, 
    form 
} from './selectors.js';

// Initialization Class
const quote = new Quote();
const ui = new UI();
const indexedDB = new IndexedDB();

// Mode Edit
let editing = false;

// Object Quote
const quoteObj = {
    pet: 'Guero',
    owner: 'Demo',
    phone: '1234567890',
    date: '2022-01-01',
    hour: '10:00',
    symptom: 'Duerme'
};

// Add items into object quote
export function dataQuote(e) {    
    quoteObj[e.target.name] = e.target.value;
}

// Checking and adding new quote 
export function newQuote(e) {
    e.preventDefault();

    // Information of quote
    const { pet, owner, phone, date, hour, symptom } = quoteObj;

    // Valid
    if (pet === '' || owner === '' || phone === '' || date === '' || hour === '' || symptom === '') {
        ui.printAlert('Todos los campos son obligatorios.', 'error');        
        return;
    }

    if (editing) {        
        // Change the object quote to editing
        quote.editQuote({...quoteObj});

        // Edit in IndexedDB
        indexedDB.editQuotes({...quoteObj});

        ui.printAlert('Editado correctamente');

        // Change text content to button
        form.querySelector('button[type=submit]').textContent = 'Crear Cita';

        // Remove edit mode
        editing = false;
    } else {                
        // Generate ID
        quoteObj.id = Date.now();
    
        // Create new quote
        quote.addQuote({...quoteObj});

        // Insert quote in Indexed DB
        indexedDB.createQuote({...quoteObj});
    }
    
    // Show html with the quotes    
    indexedDB.readQuotes();

    // Reset Object & Form
    resetObject();    
    form.reset();
}

// Reset the object
export function resetObject() {
    quoteObj.pet = '';
    quoteObj.owner = '';
    quoteObj.phone = '';
    quoteObj.date = '';
    quoteObj.hour = '';
    quoteObj.symptom = '';
}

// Delete Quote
export function deleteQuote(id) {
    // Delete quote
    indexedDB.deleteQuote(id);
}

// Loading Edit
export function loadingEdit(quote) { 
    const { id, pet, owner, phone, date, hour, symptom } = quote;

    // Fill inputs
    petInput.value = pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    hourInput.value = hour;
    symptomInput.value = symptom;

    // Fill object with the new values
    quoteObj.id = id;
    quoteObj.pet = pet;
    quoteObj.owner = owner;
    quoteObj.phone = phone;
    quoteObj.date = date;
    quoteObj.hour = hour;
    quoteObj.symptom = symptom;

    // Change text content to button
    form.querySelector('button[type=submit]').textContent = 'Guardar Cambios';
    editing = true;
}