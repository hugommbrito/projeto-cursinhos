import {
	Check,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ClassStudents } from './class_students.entity';
import { User } from './users.entity';

@Entity('classes')
@Check(`"year" >= 1900 AND "year" <= EXTRACT(YEAR FROM CURRENT_DATE)`)
export class Class {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', length: 50 })
	name: string;

	@Column({ type: 'date' })
	year: string | Date;

	@CreateDateColumn({ type: 'date' })
	created_at: string | Date;

	@UpdateDateColumn({ type: 'date' })
	updated_at: string | Date;

	@DeleteDateColumn({ type: 'date' })
	deleted_at: string | Date;

	@OneToMany(
		() => ClassStudents,
		(class_students) => class_students.class_id,
		{
			onDelete: 'CASCADE',
		}
	)
	students: ClassStudents[];

	@ManyToOne(() => User, (users) => users.classes_taught)
	professor_id: User;
}
