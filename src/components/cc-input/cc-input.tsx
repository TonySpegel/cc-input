import {
    Component,
    Prop,
    State
} from '@stencil/core';

@Component({
    tag: 'cc-input',
    styleUrl: 'cc-input.scss'
})
export class CcInputComponent {
    @Prop() cards: string;
    @State() acceptAllCards: boolean;
    @State() cardVendor: string = 'cat hashtag';
    @State() isValid: boolean;
    @State() notAllowed: string = ''
    @State() shake: string = '';
    private cardItems;

    render() {
        if (this.cards.split(',').length === 0) {
            this.acceptAllCards = true;
        } else {
            const cards = this.cards.split(',');
            this.acceptAllCards = false;
            this.cardItems = cards.map(card => <li>{card}</li>);
        }

        const cardVendor = `cc-icon ${this.cardVendor} ${this.notAllowed}`;
        const gridClass = `grid-mc-gridface ${this.shake}`

        return (
            <div class={gridClass}>
                <span class="cc-input-wrapper cc-material">
                    <span class={cardVendor} />

                    <input
                        onKeyDown={event => this.isNumber(event)}
                        onKeyUp={event => this.handleInput(event)}
                        class="cc-input"
                        maxlength="16"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        type="text"
                    />
                </span>

                <span class="cvc-wrapper">
                    <input
                        onKeyDown={event => this.isNumber(event)}
                        class="cvc-input cc-material"
                        maxlength="3"
                        placeholder="CVC"
                        type="text"
                    />
                    <span class="cvs-input-help">
                        <i class="material-icons">help_outline</i>
                    </span>
                </span>
                <div class="allowed-cards-hint">
                    <span>We accept the following cards</span>
                    <ul>{ this.cardItems }</ul>
                </div>
            </div>
        );
    }

    /**
     * Blocks letters from being typed
     *
     * @param {*} e
     * @returns {boolean}
     */
    isNumber(e: any): boolean {
        const charCode = e.which ? e.which : e.keyCode;

        // Letters
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            this.shake = 'shaker';

            // Don't judge me :(
            setTimeout(() => {
                this.shake = '';
            }, 1000)

            e.preventDefault();
            return false;
        }

        return true;
    }


    /**
     * Determines which Vendor is associated with a given cc-number
     *
     * @param {string} cardNumber
     * @returns {string}
     */
    getCardVendor(cardNumber: string): string {
        const amexRegEx = new RegExp('^3[47]');
        const dinersRegEx = new RegExp('^3[68]');
        const masterCardRegEx = new RegExp('^5[1-5]');
        const visaRegEx = new RegExp('^4');

        // No card at all
        if (cardNumber.length === 0) {
            this.notAllowed = 'hashtag';

            return 'cat hashtag';
        }

        // Visa
        if (cardNumber.match(visaRegEx) !== null) {
            console.log('visa');

            return 'visa';
        }

        // Mastercard
        if (cardNumber.match(masterCardRegEx) !== null) {
            return 'mastercard';
        }

        // American-Express
        if (cardNumber.match(amexRegEx) !== null) {
            return 'amex';
        }

        // Diners-Club
        if (cardNumber.match(dinersRegEx) !== null) {
            return 'diners-club';
        }

        return 'cat hashtag';
    }


    /**
     * Checks if the current vendor is included in vendorList
     *
     * @param {string} vendor
     * @param {string[]} vendorList
     * @returns {boolean}
     */
    isAcceptedCard(vendor: string, vendorList: string[]): boolean {
        if(!vendorList.includes(vendor)) {
            this.notAllowed = 'gray';

            return false;
        }

        this.notAllowed = 'hashtag';
    }

    /**
     * Handles every input
     *
     * @param e
     * @returns void
     */
    handleInput(e: any): void {
        this.cardVendor = this.getCardVendor(e.target.value);
        let cards = this.cards.split(',');
        this.isAcceptedCard(this.cardVendor, cards);
    }
}
