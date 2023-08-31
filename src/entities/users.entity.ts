import { getRounds, hashSync } from 'bcryptjs';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Class } from './classes.entity';
import { ClassStudents } from './class_students.entity';
import { MockTest } from './mock_tests.entity';
import { TestResult } from './tests_results.entity';

export enum userType {
	ALUNO = 'aluno',
	PROFESSOR = 'professor',
	RESPONSAVEL = 'responsavel',
	COORDENADOR = 'coordenador',
	SUPERUSER = 'superuser',
}

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	// @Column({ type: 'varchar', length: 50 })
	// user_name: string

	@Column({ type: 'varchar', length: 50 })
	first_name: string;

	@Column({ type: 'varchar', length: 50 })
	last_name: string;

	@Column({ type: 'varchar', length: 150, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 120 })
	password: string;

	@Column({ type: 'enum', enum: userType, default: userType.ALUNO })
	user_type: userType;

	@Column({ type: 'date' })
	birth_date: string | Date;

	@CreateDateColumn({ type: 'date' })
	created_at: string | Date;

	@UpdateDateColumn({ type: 'date' })
	updated_at: string | Date;

	@DeleteDateColumn({ type: 'date' })
	deleted_at: string | Date;

	@OneToMany(() => MockTest, (mock_tests) => mock_tests.created_by, {
		onDelete: 'SET NULL',
	})
	mock_tests_created: MockTest[];

	@OneToMany(() => TestResult, (test_results) => test_results.student_id, {
		onDelete: 'CASCADE',
	})
	test_results: TestResult[];

	@OneToMany(() => Class, (class_table) => class_table.professor_id, {
		onDelete: 'SET NULL',
	})
	classes_taught: Class[];

	@OneToMany(
		() => ClassStudents,
		(class_students) => class_students.student_id,
		{
			onDelete: 'CASCADE',
		}
	)
	classes_studied: ClassStudents[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const isEncripted: boolean = getRounds(this.password) > 0;
		if (!isEncripted) {
			this.password = hashSync(this.password, 10);
		}
	}
}
