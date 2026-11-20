
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create two-factor authentication codes table.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
    pgm.createTable('two_factor_codes', {
        id: 'id',
        user_id: {
            type: 'bigint',
            notNull: true,
            unique: true,
            references: '"users"',
            onDelete: 'CASCADE'
        },
        code_hash: {
            type: 'varchar(255)',
            notNull: true
        },
        expires_at: {
            type: 'timestamptz',
            notNull: true
        },
        attempts: {
            type: 'integer',
            notNull: true,
            default: 0
        },
        verified_at: {
            type: 'timestamptz'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });

    pgm.addConstraint(
        'two_factor_codes',
        'two_factor_codes_attempts_check',
        {
            check: 'attempts >= 0'
        }
    );
};

/**
 * Reverse two-factor authentication table creation.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable('two_factor_codes');
};