import { Component, Prop } from "@stencil/core";

@Component({
    tag: "cc-input",
    styleUrl: "cc-input.scss"
})
export class CcInputComponent {
    @Prop() hours: string;
    @Prop() minutes: string;
    @Prop() seconds: string;
    @Prop() milliseconds: string;

    render() {
        return (
            <div class="grid-mc-gridface">
                <span class="cc-input-wrapper cc-material">
                    <span class="cc-icon mastercard"></span>
                    <input
                        onKeyDown={ () => this.handleInput(event) }
                        class="cc-input"
                        type="text"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                </span>

                <span class="cvc-wrapper">
                    <input class="cvs-input cc-material" type="text" placeholder="CVC" />
                    <span class="cvs-input-help">
                        <i class="material-icons">help_outline</i>
                    </span>
                </span>
            </div>
        );
    }

    /**
     *
     * @param e
     */
    handleInput(e: any) {
        let charCode = e.which ? e.which : (e.keyCode);
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();

            return false;
        }

        return true;
    }
}
