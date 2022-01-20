<?php

namespace App\DataFixtures;

use App\Entity\Artist;
use App\Entity\Type;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class ArtistTypeFixtures extends Fixture
{
    private UserPasswordHasherInterface $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $type1 = new Type();
        $type1->setName('Techno');

        $type2 = new Type();
        $type2->setName('House');

        $type3 = new Type();
        $type3->setName('Acid');

        $type4 = new Type();
        $type4->setName('Trans');

        $type5 = new Type();
        $type5->setName('Dubstep');

        $manager->persist($type1);
        $manager->persist($type2);
        $manager->persist($type3);
        $manager->persist($type4);
        $manager->persist($type5);

        for ($c = 0; $c < 10; $c++) {
            $artist = new Artist();
            $artist->setName($faker->word())
                ->setDescription($faker->sentence())
                ->setPhoto("assets/images/profile/photo.png");

            $manager->persist($artist);
        }

        $user = new User();
        $user->setEmail('admin@gmail.com')
            ->setPassword($this->encoder->hashPassword($user, 'p4ssword'));

        $manager->persist($user);

        $manager->flush();
    }
}
