export class HashManagerMock {
    public async hash(text: string): Promise<string> {
        switch (text) {
            case "ninja123":
                return "$12$iGerazW5yQVSVnNQ6CzLYOEDluf6CL6aOGEGwJKgUNRxik3t2lDHS"
            default:
                return "hash-mock"
        }
    }

    public async compare(text: string, hash: string): Promise<boolean> {
        switch(text){
            case "ninja123":
                return hash === "$12$iGerazW5yQVSVnNQ6CzLYOEDluf6CL6aOGEGwJKgUNRxik3t2lDHS"
            default:
                return false
        }
    }
}