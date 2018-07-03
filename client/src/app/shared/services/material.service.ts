import {ElementRef} from "@angular/core";

declare var M;

export interface MaterialInstance {
    open?(): void
    close?(): void
    destroy?(): void
}

export class MaterialService {
    static toast(massage: string) {
        M.toast({html: massage});
    }

    static initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement);
    }

    static updateTextInputs() {
        M.updateTextFields();
    }

    static initModal(ref: ElementRef): MaterialInstance {
        return M.Modal.init(ref.nativeElement)
    }

    static initTooltip(ref: ElementRef): MaterialInstance {
        return M.Tooltip.init(ref.nativeElement);
    }
}
