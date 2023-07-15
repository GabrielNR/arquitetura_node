import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1686768717925 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn( //Deletar uma coluna
		'appointments', 'provider'  //Tabela e coluna
		);
		
		await queryRunner.addColumn( //Criar uma coluna 
		'appointments',            //Tabela
		new TableColumn({          //Nova Coluna
			name: 'provider_id',     //Nome da Coluna 
			type: 'uuid',            //Tipo da coluna
			isNullable: true,        //aceita ser nulo 
		}),
	);

		await queryRunner.createForeignKey( //Criar uma chave estrangeira
		'appointments',                   //tabela
		new TableForeignKey({             //tabela da foreignkey
			name: 'AppointmentsProvider',
			columnNames: ['provider_id'],   //qual coluna vai recerber a chave estrageira
			referencedColumnNames: ['id'],  //qual que e o nome da coluna na tabela usuario que vai representar o provider_id  
			referencedTableName: 'users',   //qual o nome da tabela que vai fazer referencia com o campo
			onDelete: 'SET NULL',           //O que vai acontecer se o usuario for deletado
			onUpdate: 'CASCADE',            //caso o usuario tenha id alterado alterar todos os provider_ids 
		}),
	);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'AppointmentsProvider'); //Deletar a foreignkey AppointmentProvider

    await queryRunner.dropColumn('appointments', 'provider_id');             //Deletar a coluna provider_id

    await queryRunner.addColumn(                                           // Criar dinovo a coluna de provider
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
	}
}
