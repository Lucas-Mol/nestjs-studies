export class GetUserDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
  ) {}
}
