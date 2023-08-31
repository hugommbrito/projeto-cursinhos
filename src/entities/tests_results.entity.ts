import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MockTest } from './mock_tests.entity';
import { User } from './users.entity';

@Entity('tests_results')
export class TestResult {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'integer', length: 4 })
	questions_answered: number;

	@Column({ type: 'integer', length: 4 })
	questions_correct: number;

	@Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
	correct_rate: number | null | undefined;

	@CreateDateColumn({ type: 'date' })
	created_at: string | Date;

	@UpdateDateColumn({ type: 'date' })
	updated_at: string | Date;

	@DeleteDateColumn({ type: 'date' })
	deleted_at: string | Date;

	@ManyToOne(() => User, (users) => users.test_results)
	student_id: User;

	@ManyToOne(() => MockTest, (mockTests) => mockTests.tests_taken)
	test_id: MockTest;

	@BeforeInsert()
	@BeforeUpdate()
	calculateCorrectRate() {
		this.correct_rate = this.questions_correct / this.questions_answered;
	}
}
