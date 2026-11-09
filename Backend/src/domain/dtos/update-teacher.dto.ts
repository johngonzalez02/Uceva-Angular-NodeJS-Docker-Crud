export class UpdateTeacherDTO {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly department: string,
        public readonly specialty: string,
        public readonly hiredate: Date,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateTeacherDTO?] {
        const {
            name,
            email,
            phone,
            department,
            specialty,
            hiredate,
            status = true
        } = object;

        if (!name) return ["Missing name"];
        if (!email) return ["Missing email"];
        if (!phone) return ["Missing phone"];
        if (!department) return ["Missing department"];
        if (!specialty) return ["Missing specialty"];
        if (!hiredate) return ["Missing hiredate"];

        if (name.length > 100)
            return ["name is too large, max length is 100 characters"];

        if (email.length > 150)
            return ["email is too large, max length is 150 characters"];

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return ["Invalid email"];

        if (!/^[0-9]{10}$/.test(phone))
            return ["Invalid phone, it must have 10 digits"];

        if (department.length > 100)
            return ["department is too large, max length is 100 characters"];

        if (specialty.length > 100)
            return ["specialty is too large, max length is 100 characters"];

        const date = new Date(hiredate);
        if (isNaN(date.getTime()) || date > new Date())
            return ["Invalid hiredate"];

        if (typeof status !== "boolean")
            return ["Invalid status"];

        return [
            undefined,
            new UpdateTeacherDTO(
                name,
                email,
                phone,
                department,
                specialty,
                hiredate,
                status
            )
        ];
    }

}
