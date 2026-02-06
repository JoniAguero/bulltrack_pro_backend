export class User {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly password?: string, // Optional because we might not want to pass it around in the domain often
        public readonly name?: string | null,
        public readonly createdAt?: Date,
    ) { }
}
