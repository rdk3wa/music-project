<?php

namespace App\DataFixtures;

use App\Entity\Album;
use App\Entity\Artist;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;


class AlbumFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $artists = $manager->getRepository(Artist::class)->findAll();

        foreach ($artists as $artist) {
            for ($i = 0; $i < mt_rand(2, 4); $i++) {
                $album = new Album();
                $album->setTitle($faker->words(3, true))
                    ->setArtist($artist)
                    ->setDuration($faker->randomFloat(2, 40, 120))
                    ->setNbMusic($faker->numberBetween(5, 10))
                    ->setCover("assets/images/cover/cover.jpg");

                $manager->persist($album);
            }
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            ArtistTypeFixtures::class,
        );
    }
}
