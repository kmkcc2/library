import { Table, Column, Model, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey } from 'sequelize-typescript'

@Table
export class Book extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number

  @Column
  declare isbn: string

  @Column
  declare author: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date

}