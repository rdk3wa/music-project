<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220120144250 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_39986E43B7970CF8');
        $this->addSql('CREATE TEMPORARY TABLE __temp__album AS SELECT id, artist_id, title, duration, nb_music, cover FROM album');
        $this->addSql('DROP TABLE album');
        $this->addSql('CREATE TABLE album (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, artist_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, duration VARCHAR(255) DEFAULT NULL COLLATE BINARY, nb_music INTEGER NOT NULL, cover VARCHAR(255) NOT NULL COLLATE BINARY, CONSTRAINT FK_39986E43B7970CF8 FOREIGN KEY (artist_id) REFERENCES artist (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO album (id, artist_id, title, duration, nb_music, cover) SELECT id, artist_id, title, duration, nb_music, cover FROM __temp__album');
        $this->addSql('DROP TABLE __temp__album');
        $this->addSql('CREATE INDEX IDX_39986E43B7970CF8 ON album (artist_id)');
        $this->addSql('DROP INDEX IDX_CD52224AC54C8C93');
        $this->addSql('DROP INDEX IDX_CD52224A1137ABCF');
        $this->addSql('CREATE TEMPORARY TABLE __temp__music AS SELECT id, album_id, type_id, title, year, duration, file FROM music');
        $this->addSql('DROP TABLE music');
        $this->addSql('CREATE TABLE music (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, album_id INTEGER NOT NULL, type_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, year INTEGER DEFAULT NULL, duration VARCHAR(255) DEFAULT NULL COLLATE BINARY, file VARCHAR(255) DEFAULT NULL COLLATE BINARY, CONSTRAINT FK_CD52224A1137ABCF FOREIGN KEY (album_id) REFERENCES album (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_CD52224AC54C8C93 FOREIGN KEY (type_id) REFERENCES type (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO music (id, album_id, type_id, title, year, duration, file) SELECT id, album_id, type_id, title, year, duration, file FROM __temp__music');
        $this->addSql('DROP TABLE __temp__music');
        $this->addSql('CREATE INDEX IDX_CD52224AC54C8C93 ON music (type_id)');
        $this->addSql('CREATE INDEX IDX_CD52224A1137ABCF ON music (album_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_39986E43B7970CF8');
        $this->addSql('CREATE TEMPORARY TABLE __temp__album AS SELECT id, artist_id, title, duration, nb_music, cover FROM album');
        $this->addSql('DROP TABLE album');
        $this->addSql('CREATE TABLE album (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, artist_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL, duration VARCHAR(255) DEFAULT NULL, nb_music INTEGER NOT NULL, cover VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO album (id, artist_id, title, duration, nb_music, cover) SELECT id, artist_id, title, duration, nb_music, cover FROM __temp__album');
        $this->addSql('DROP TABLE __temp__album');
        $this->addSql('CREATE INDEX IDX_39986E43B7970CF8 ON album (artist_id)');
        $this->addSql('DROP INDEX IDX_CD52224A1137ABCF');
        $this->addSql('DROP INDEX IDX_CD52224AC54C8C93');
        $this->addSql('CREATE TEMPORARY TABLE __temp__music AS SELECT id, album_id, type_id, title, year, duration, file FROM music');
        $this->addSql('DROP TABLE music');
        $this->addSql('CREATE TABLE music (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, album_id INTEGER NOT NULL, type_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL, year INTEGER DEFAULT NULL, duration VARCHAR(255) DEFAULT NULL, file VARCHAR(255) DEFAULT NULL)');
        $this->addSql('INSERT INTO music (id, album_id, type_id, title, year, duration, file) SELECT id, album_id, type_id, title, year, duration, file FROM __temp__music');
        $this->addSql('DROP TABLE __temp__music');
        $this->addSql('CREATE INDEX IDX_CD52224A1137ABCF ON music (album_id)');
        $this->addSql('CREATE INDEX IDX_CD52224AC54C8C93 ON music (type_id)');
    }
}
