<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TypeRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"type:read"}}
 * )
 */
class Type
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"type:read", "music:read", "music:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"type:read", "music:read"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Music::class, mappedBy="type")
     * @Groups({"type:read"})
     */
    private $musics;

    public function __construct()
    {
        $this->musics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Music[]
     */
    public function getMusics(): Collection
    {
        return $this->musics;
    }

    public function addMusic(Music $music): self
    {
        if (!$this->musics->contains($music)) {
            $this->musics[] = $music;
            $music->setType($this);
        }

        return $this;
    }

    public function removeMusic(Music $music): self
    {
        if ($this->musics->removeElement($music)) {
            // set the owning side to null (unless already changed)
            if ($music->getType() === $this) {
                $music->setType(null);
            }
        }

        return $this;
    }
}
