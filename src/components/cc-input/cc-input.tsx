import {
    Component,
    Prop,
    State
} from '@stencil/core';

@Component({
    tag: "cc-input",
    styleUrl: "cc-input.scss",
    shadow: true
})
export class CcInputComponent {
    @Prop() cards: string;
    @State() cardType: string;
    @State() isValid: boolean;

    public props = {
        class: `cc-icon ${this.cardType}`
    };

    render() {
        const cards = this.cards.split(",");
        const cardItems = cards.map(card => <li>{card}</li>);
        let cardType = `cc-icon ${this.cardType}`;

        return (
            <div class="grid-mc-gridface">
                <span class="cc-input-wrapper cc-material">
                    <span class={cardType} />

                    <input
                        onKeyDown={event => this.handleInput(event)}
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
                    <ul>{cardItems}</ul>
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
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
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
    getCardType(cardNumber: string): string {
        const visaRegEx = new RegExp('^4');
        const mastercardRegEx = new RegExp('/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/');
        const amexRegEx = new RegExp('^3[47]');

        // Visa
        if (cardNumber.match(visaRegEx) !== null) {
            return 'visa';
        }

        // Mastercard
        if (mastercardRegEx.test(cardNumber) !== null) {
            return 'mastercard';
        }

        // American-Express
        if (cardNumber.match(amexRegEx) !== null) {
            return 'amex';
        }
    }

    /**
     * Handles every input
     *
     * @param e
     */
    handleInput(e: any) {
        if (this.isNumber(e)) {
            console.log(this.getCardType(e.target.value));
            this.cardType = this.getCardType(e.target.value);

            return false;
        }
    }
}
