console.log('Wrorrororrororororo-192-1291-929-191-291-9');

class ReemindMeButton extends HTMLButtonElement {
    constructor() {
        super()
    }

    showReminderPopup() {
        console.log('Well doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    }

    connectedCallback() {
        this.addEventListener('click', this.showReminderPopup)
    }
}

customElements.define('reemindme-button', ReemindMeButton, {extends: "button"});