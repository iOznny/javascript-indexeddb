import { dataQuote, newQuote } from '../functions.js';
import { 
    petInput, 
    ownerInput, 
    phoneInput, 
    dateInput, 
    hourInput, 
    symptomInput, 
    form 
} from '../selectors.js';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        petInput.addEventListener('input', dataQuote);
        ownerInput.addEventListener('input', dataQuote);
        phoneInput.addEventListener('input', dataQuote);
        dateInput.addEventListener('input', dataQuote);
        hourInput.addEventListener('input', dataQuote);
        symptomInput.addEventListener('input', dataQuote);

        // Form for new quotes
        form.addEventListener('submit', newQuote);
    }
}

export default App;