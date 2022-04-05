export default interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  drive_license: string;
  avatar?: string;
}
