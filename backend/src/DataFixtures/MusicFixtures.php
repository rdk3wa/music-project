<?php

namespace App\DataFixtures;

use App\Entity\Album;
use App\Entity\Music;
use App\Entity\Type;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;


class MusicFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $albums = $manager->getRepository(Album::class)->findAll();
        $types = $manager->getRepository(Type::class)->findAll();

        foreach ($albums as $album) {
            for ($i = 0; $i < mt_rand(5, 10); $i++) {
                $music = new Music();
                $music->setTitle($faker->words(3, true))
                    ->setYear($faker->numberBetween(1980, 2020))
                    ->setDuration($faker->randomFloat(2, 2, 10))
                    ->setFile("assets/music/titre".$faker->randomElement(["1", "2", "3", "4"]).".mp3")
                    ->setType($faker->randomElement($types))
                    ->setAlbum($album);

                $manager->persist($music);
            }
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            AlbumFixture::class,
        );
    }
}
