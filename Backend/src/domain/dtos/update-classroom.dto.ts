export class UpdateClassroomDTO {

    private constructor(
        public readonly name: string,
        public readonly building: string,
        public readonly capacity: number,
        public readonly type: string,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateClassroomDTO?] {
        const {
            name,
            building,
            capacity,
            type,
            status = true
        } = object;

        const validTypes = ["Aula", "Laboratorio", "Auditorio", "Sala de Computo"];

        if (!name) return ["Missing name"];
        if (!building) return ["Missing building"];
        if (!capacity) return ["Missing capacity"];
        if (!type) return ["Missing type"];

        if (name.length > 50)
            return ["name is too large, max length is 50 characters"];

        if (building.length > 100)
            return ["building is too large, max length is 100 characters"];

        if (!Number.isInteger(capacity) || capacity < 1 || capacity > 500)
            return ["Invalid capacity, it must be between 1 and 500"];

        if (!validTypes.includes(type))
            return ["Invalid type, valid values are: " + validTypes.join(", ")];

        if (typeof status !== "boolean")
            return ["Invalid status"];

        return [
            undefined,
            new UpdateClassroomDTO(
                name,
                building,
                capacity,
                type,
                status
            )
        ];
    }

}
