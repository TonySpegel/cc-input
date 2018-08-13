import {
    Component,
    Prop,
    State
} from '@stencil/core';

@Component({
    tag: 'cc-input',
    styleUrl: 'cc-input.scss',
    shadow: true
})
export class CcInputComponent {
    @Prop() cards: string;
    @State() isValid: boolean;

    componentDidLoad() {
        console.log(this.cards);
    }

    render() {
        const cards = this.cards.split(',');
        const cardItems = cards.map(card =>
            <li>{card}</li>
        );

        return <div class="grid-mc-gridface">
                <span class="cc-input-wrapper cc-material">
                    <span class="cc-icon mastercard" />
                    <input
                        onKeyDown={ (event) => this.handleInput(event) }
                        class="cc-input"
                        maxlength="16"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        type="text"
                    />
                </span>

                <span class="cvc-wrapper">
                <input
                    onKeyDown={ (event) => this.isNumber(event) }
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
            </div>;
    }


    /**
     * Blocks letters from being typed
     *
     * @param {*} e
     * @returns {boolean}
     */
    isNumber(e: any): boolean {
        let charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();

            return false;
        }

        return true;
    }

    /**
     * Handles every input
     *
     * @param e
     */
    handleInput(e: any) {
        if (this.isNumber(e)) {
            console.log('Nummer');

            return false;
        }

        console.log('Buchstabe');
    }
}
