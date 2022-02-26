class Quote {
    constructor() {
        this.quotes = [];
    }

    // Add quote
    addQuote(quote) {
        this.quotes = [...this.quotes, quote];        
    }

    // Edit quote
    editQuote(qUpdate) { 
        this.quotes = this.quotes.map(quote => quote.id === qUpdate.id ? qUpdate : quote);
    }

    // Delete quote
    deleteQuote(id) {
        this.quotes = this.quotes.filter(quote => quote.id !== id);
    }
}

export default Quote;