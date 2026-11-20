
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Create initial database tables.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {

    pgm.createTable('users', {
        id: 'id',
        name: {
            type: 'varchar(100)',
            notNull: true,
        },
        email: {
            type: 'varchar(255)',
            notNull: true,
            unique: true
        },
        password: {
            type: 'varchar(255)',
            notNull: true
        },
        role: {
            type: 'varchar(20)',
            notNull: true
        },
        sub_role: {
            type: 'varchar(30)'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });

    pgm.addConstraint('users', 'users_role_check', {
        check: "role IN ('admin', 'team_lead', 'team_member')"
    });

    pgm.addConstraint('users', 'users_sub_role_check', {
        check: `
            (role = 'team_member'
                AND sub_role IN ('software_engineer', 'qa_tester'))
            OR
            (role IN ('admin', 'team_lead')
                AND sub_role IS NULL)
        `
    });


    pgm.createTable('projects', {
        id: 'id',
        name: {
            type: 'varchar(150)',
            notNull: true
        },
        description: {
            type: 'text'
        },
        team_lead_id: {
            type: 'bigint',
            notNull: true,
            references: '"users"',
            onDelete: 'RESTRICT'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });

    pgm.createIndex('projects', 'team_lead_id');


    pgm.createTable('teams', {
        id: 'id',
        name: {
            type: 'varchar(150)',
            notNull: true
        },
        project_id: {
            type: 'bigint',
            notNull: true,
            unique: true,
            references: '"projects"',
            onDelete: 'CASCADE'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });


    pgm.createTable('team_members', {
        team_id: {
            type: 'bigint',
            notNull: true,
            references: '"teams"',
            onDelete: 'CASCADE'
        },
        user_id: {
            type: 'bigint',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE'
        }
    });

    pgm.addConstraint('team_members', 'team_members_pkey', {
        primaryKey: ['team_id', 'user_id']
    });


    pgm.createTable('tasks', {
        id: 'id',
        title: {
            type: 'varchar(200)',
            notNull: true
        },
        description: {
            type: 'text'
        },
        status: {
            type: 'varchar(20)',
            notNull: true,
            default: 'backlog'
        },
        priority: {
            type: 'varchar(20)',
            notNull: true,
            default: 'normal'
        },
        story_points: {
            type: 'integer',
            notNull: true
        },
        team_id: {
            type: 'bigint',
            notNull: true,
            references: '"teams"',
            onDelete: 'CASCADE'
        },
        assigned_by: {
            type: 'bigint',
            notNull: true,
            references: '"users"',
            onDelete: 'RESTRICT'
        },
        assigned_to: {
            type: 'bigint',
            notNull: true
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });

    pgm.addConstraint('tasks', 'tasks_status_check', {
        check: "status IN ('backlog', 'in_progress', 'in_review', 'complete', 'approved')"
    });

    pgm.addConstraint('tasks', 'tasks_priority_check', {
        check: "priority IN ('low', 'normal', 'high', 'urgent')"
    });

    pgm.addConstraint('tasks', 'tasks_story_points_check', {
        check: 'story_points IN (1, 2, 3, 5, 8)'
    });

    pgm.addConstraint('tasks', 'tasks_assignee_team_fk', {
        foreignKeys: {
            columns: ['team_id', 'assigned_to'],
            references: 'team_members(team_id, user_id)',
            onDelete: 'RESTRICT'
        }
    });

    pgm.createIndex('tasks', 'team_id');
    pgm.createIndex('tasks', 'assigned_by');
    pgm.createIndex('tasks', 'assigned_to');
    pgm.createIndex('tasks', 'status');


    pgm.createTable('channels', {
        id: 'id',
        name: {
            type: 'varchar(150)',
            notNull: true
        },
        team_id: {
            type: 'bigint',
            notNull: true,
            unique: true,
            references: '"teams"',
            onDelete: 'CASCADE'
        },
        created_by: {
            type: 'bigint',
            notNull: true,
            references: '"users"',
            onDelete: 'RESTRICT'
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });


    pgm.createTable('messages', {
        id: 'id',
        channel_id: {
            type: 'bigint',
            notNull: true,
            references: '"channels"',
            onDelete: 'CASCADE'
        },
        created_by: {
            type: 'bigint',
            notNull: true,
            references: '"users"',
            onDelete: 'RESTRICT'
        },
        message: {
            type: 'text',
            notNull: true
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });

    pgm.createIndex('messages', ['channel_id', 'created_at']);
    pgm.createIndex('messages', 'created_by');
};


/**
 * Reverse initial database setup.
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
    pgm.dropTable('messages');
    pgm.dropTable('channels');
    pgm.dropTable('tasks');
    pgm.dropTable('team_members');
    pgm.dropTable('teams');
    pgm.dropTable('projects');
    pgm.dropTable('users');
};
