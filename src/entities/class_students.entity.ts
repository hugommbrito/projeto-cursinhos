import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Class } from './classes.entity';
import { User } from './users.entity';

@Entity('classe_students')
export class ClassStudents {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@CreateDateColumn({ type: 'date' })
	created_at: string | Date;

	@UpdateDateColumn({ type: 'date' })
	updated_at: string | Date;

	@DeleteDateColumn({ type: 'date' })
	deleted_at: string | Date;

	@ManyToOne(() => User, (users) => users.classes_studied)
	student_id: User;

	@ManyToOne(() => Class, (classes) => classes.students)
	class_id: Class;
}
