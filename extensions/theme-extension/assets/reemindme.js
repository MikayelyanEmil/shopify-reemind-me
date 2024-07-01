console.log('Wrorrororrororororo-192-1291-929-191-291-9');

class ReemindMeButton extends HTMLButtonElement {
    constructor() {
        super()
    }

    async getStyles(shop) {
        const options = {
            method: "Get",
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log('shop ', shop)
        const response = await fetch('/apps/reemind-me/customization-settings', options);
        const data = await response.json();
        console.log(data)
        const {id, ...styles} = data;
        console.log(styles);
        return styles;
    }

    async showReminderPopup() {
        const popup = document.createElement('reminder-popup');
        popup.template = this.querySelector('template').content.cloneNode(true);
        // console.log(popup.template)
        document.body.appendChild(popup);
    }

    async connectedCallback() {
        console.log('connected');
        const shop = document.getElementById('reemindme_merchant_shop').value;
        const styles = await this.getStyles(shop);
        this.style.borderColor = styles.buttonColor;
        this.style.color = styles.buttonColor;
        this.style.borderRadius = styles.buttonBorderRadius;
        this.addEventListener('click', this.showReminderPopup);
    }
}


class ReminderPopup extends HTMLElement {
    constructor() {
        super();
    }

    async subscribe(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const date = e.target.datePicker.value;
        const productId = e.target.productId.value;
        const shop = e.target.shop.value;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                date,
                productId,
                shop
            })
        }
        await fetch('/apps/reemind-me/subscribe', options);
    }

    connectedCallback() {
        this.appendChild(this.template);
        this.querySelector('form').onsubmit = (e) => this.subscribe(e);
    }
}

customElements.define('reemindme-button', ReemindMeButton, {extends: "button"});
customElements.define('reminder-popup', ReminderPopup); 
