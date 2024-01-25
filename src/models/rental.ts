import { Table, Column, Model, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, BelongsToMany } from 'sequelize-typescript'
import { User } from './user'
import { Book } from './book'

@BelongsToMany(() => User, { through: 'user_id' })
@BelongsToMany(() => Book, { through: 'book_id' })
@Table
export class Rental extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number

  @Column
  declare user_id: number

  @Column
  declare book_id: number

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}
