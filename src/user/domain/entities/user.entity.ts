export class User {
    constructor(
        public readonly id: number | null,
        public email: string,
        public password_hash: string,
        public full_name: string,
        public avatar_url: string | null,
        public role: string,
        public is_active: number | null,
        public email_verified: number | null,
    ){}

    activate(){
        this.is_active = 1;
    }

    verifyEmail(){
        this.email_verified = 1;
    }

}