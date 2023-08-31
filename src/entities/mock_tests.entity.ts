import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subjects.entity';
import { TestResult } from './tests_results.entity';
import { User } from './users.entity';

@Entity('mock_tests')
export class MockTest {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'date' })
	test_date: string | Date;

	@Column({ type: 'integer', length: 4 })
	amount_questions: number;

	@CreateDateColumn({ type: 'date' })
	created_at: string | Date;

	@UpdateDateColumn({ type: 'date' })
	updated_at: string | Date;

	@DeleteDateColumn({ type: 'date' })
	deleted_at: string | Date;

	@OneToMany(() => TestResult, (tests_results) => tests_results.test_id, {
		onDelete: 'CASCADE',
	})
	tests_taken: TestResult[];

	@ManyToOne(() => User, (users) => users.mock_tests_created)
	created_by: User;

	@ManyToOne(() => Subject, (subjects) => subjects.mock_tests)
	subject_id: Subject;
}
