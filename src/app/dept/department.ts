export class Department {
    idBfDepartment: string;
    code: string;
    name: string;
    level: number;
    childDepartmentList: Department[];
    isLeaf: boolean;
}
