export class User {
    constructor(
        public readonly id: number | null,
        public email: string,
        public password_hash: string,
        public full_name: string,
        public avatar_url: string,
        public role: string,
        public is_active: number,
        public email_verified: number
    ){}

    activate(){
        this.is_active = 1;
    }

    verifyEmail(){
        this.email_verified = 1;
    }

}