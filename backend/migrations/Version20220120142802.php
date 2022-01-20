<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220120142802 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE album (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, artist_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL, duration VARCHAR(255) DEFAULT NULL, nb_music INTEGER NOT NULL, cover VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE INDEX IDX_39986E43B7970CF8 ON album (artist_id)');
        $this->addSql('CREATE TABLE artist (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description CLOB DEFAULT NULL, photo VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE music (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, album_id INTEGER NOT NULL, type_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL, year INTEGER DEFAULT NULL, duration VARCHAR(255) DEFAULT NULL, file VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE INDEX IDX_CD52224A1137ABCF ON music (album_id)');
        $this->addSql('CREATE INDEX IDX_CD52224AC54C8C93 ON music (type_id)');
        $this->addSql('CREATE TABLE type (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE album');
        $this->addSql('DROP TABLE artist');
        $this->addSql('DROP TABLE music');
        $this->addSql('DROP TABLE type');
        $this->addSql('DROP TABLE user');
    }
}
