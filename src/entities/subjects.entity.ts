import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MockTest } from './mock_tests.entity';

@Entity('subjects')
export class Subject {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	name: string;

	@CreateDateColumn({ type: 'date' })
	created_at: string | Date;

	@UpdateDateColumn({ type: 'date' })
	updated_at: string | Date;

	@DeleteDateColumn({ type: 'date' })
	deleted_at: string | Date;

	@OneToMany(() => MockTest, (mock_tests) => mock_tests.subject_id, {
		onDelete: 'NO ACTION',
	})
	mock_tests: MockTest[];
}
