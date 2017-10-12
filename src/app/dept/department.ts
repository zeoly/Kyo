export class Department {
    idBfDepartment: string;
    code: string;
    name: string;
    level: number;
    parentDepartmentId: string;
    childDepartmentList: Department[];
    isLeaf: boolean;
    parent: Department;
}
