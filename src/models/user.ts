import { Table, Column, Model, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey } from 'sequelize-typescript'

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number

  @Column
  declare name: string

  @Column
  declare login: string

  @Column
  declare password: string

  @Column
  declare role: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}
