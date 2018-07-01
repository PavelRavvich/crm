declare var M;

export class MaterialService {
    static toast(massage: string) {
        M.toast({html: massage});
    }
}
